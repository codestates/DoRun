/*global kakao*/
import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import CreateModal from '../CreateModal/CreateModal';
import './Map.css';
const APP_KEY = '887dddeb1554071f577f2ad9bef8d920';

const Map = () => {
  const [map, setMap] = useState(null);

  // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // const confirmModalHandler = () => {
  //   isConfirmModalOpen ? setIsConfirmModalOpen(false) : setIsConfirmModalOpen(true)
  // };

  const [createModalPosition, setCreateModalPosition] = useState('createDown');
  const createModalHandler = () => {
    createModalPosition === 'createDown'
      ? setCreateModalPosition('createUp')
      : setCreateModalPosition('createDown');
  };

  //! 마커를 위에 표시 될 customOverlay 내용
  var content = document.createElement('div');
  content.className = 'wrapping';
  content.innerHTML = 'Do Run!';

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
          mapTypeId: kakao.maps.MapTypeId.ROADMAP,
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);

        //! 지도 중앙에 마커를 기본 세팅.
        var normalImageSrc =
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
        var imageSize = new kakao.maps.Size(35, 35);
        var markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          position: createdMap.getCenter(),
          image: markerImage,
        });
        marker.setMap(createdMap);

        //! 마커 위에 있는 customOverlay
        const customOverlay = new kakao.maps.CustomOverlay({
          clickable: true,
          content: content,
        });

        //! 마커 클릭 이벤트 : 마커를 클릭하면  오픈
        marker.addListener('click', function () {
          customOverlay.setMap(createdMap);
          customOverlay.getVisible(true);
          customOverlay.setPosition(marker.getPosition());
        });

        //! 기본 세팅 이외의 부분을 클릭(터치)하면 그곳으로 마커 이동 + 좌표 반환
        marker.setMap(createdMap);
        kakao.maps.event.addListener(
          createdMap,
          'click',
          function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            let overlayPosition = customOverlay.getPosition();
            let markerPosition = marker.getPosition();
            overlayPosition = markerPosition;
            if (overlayPosition !== customOverlay) {
              customOverlay.setMap(null);
            }
          }
        );

        //! 커스텀 오버레이 클릭 이벤트: 커스텀 오버레이를 클릭하면 모달로 연결
        //content.addEventListener('click', createModalHandler)

        content.addEventListener('click', () => {
          setCreateModalPosition('createUp');
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
        {/* {isConfirmModalOpen && <ConfirmModal confirmModalHandler={confirmModalHandler} />} */}
        <div className={createModalPosition}>
          <CreateModal createModalHandler={createModalHandler} />
        </div>
      </div>
    </>
  );
};

export default Map;
