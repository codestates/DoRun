/*global kakao*/
import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal/Modal';
const APP_KEY = '887dddeb1554071f577f2ad9bef8d920';

const Map = () => {
  const [map, setMap] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const createMap = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        let container = document.getElementById('Mymap');
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
          mapTypeId: kakao.maps.MapTypeId.ROADMAP
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);        
        

        //! 지도 중앙에 마커를 기본 세팅.
        const marker = new kakao.maps.Marker({ 
          position: createdMap.getCenter()
        }); 
        marker.setMap(createdMap);


        //! 마커를 위에 표시 될 customOverlay 내용
        var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

        const customOverlay = new kakao.maps.CustomOverlay({
          clickable: true,
          content: content,
        });

        //! 마커 클릭 이벤트 : 마커를 클릭하면  오픈
        marker.addListener( 'click', function() {
          customOverlay.setMap(createdMap)
          customOverlay.getVisible(true)
          customOverlay.setPosition(marker.getPosition())
        });

        //! 기본 세팅 이외의 부분을 클릭(터치)하면 그곳으로 마커 이동 + 좌표 반환
        marker.setMap(createdMap);
        kakao.maps.event.addListener(createdMap, 'click', function(mouseEvent) {        
          const latlng = mouseEvent.latLng; 
          marker.setPosition(latlng);
          console.log( 'marker.getPosition', marker.getPosition().La, '우와아아아' ,marker.getPosition().Ma)
          let overlayPosition = customOverlay.getPosition();
          let markerPosition = marker.getPosition();
          overlayPosition = markerPosition;
          if (overlayPosition !== customOverlay) {
            customOverlay.setMap(null);
          }
        });

        
      });





    };
  };

  useEffect(() => {
    createMap();
  
  }, []);

  return (
    <>
      <div id="Mymap" style={{ width: '100vw', height: '100vh' }}>
      {isOpen && <Modal modalHandler={modalHandler} />}
      </div>
    </>
  );
};

export default Map;
