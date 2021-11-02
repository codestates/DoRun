/*global kakao*/
import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import CreateModal from '../CreateModal/CreateModal';
import './Map.css';
import { markerdata } from './markerData';
import CrewModal from '../CrewModal/CrewModal';
const { REACT_APP_KAKAO_MAP } = process.env;

const Map = () => {
  const [map, setMap] = useState(null);

  const [crewModalPosition, setCrewModalPosition] = useState('down');

  const crewModalHandler = () => {
    crewModalPosition === 'down'
      ? setCrewModalPosition('up')
      : setCrewModalPosition('down');
  };



  const [createModalPosition, setCreateModalPosition] = useState('createDown');
  const createModalHandler = () => {
    createModalPosition === 'createDown'
      ? setCreateModalPosition('createUp')
      : setCreateModalPosition('createDown');
  };

  //! 마커를 위에 표시 될 customOverlay 내용
  var customOverlayContent = document.createElement('div');
  customOverlayContent.className = 'wrapping';
  customOverlayContent.innerHTML = 'Do Run!';

  const createMap = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKAO_MAP}&autoload=false`;
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
        // ----------------------------------------------------------------------- basic setting

        //! userID가 있고, Crew에 속해있지 않은 사람에게 crewCreate 마커 생성
        if ((sessionStorage.getItem('userId') !== 'null') &&
          (sessionStorage.getItem('userCrewId') === 'null')) {
          //! red마커 생성
          var normalImageSrc =
            'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
          var imageSize = new kakao.maps.Size(35, 35);
          var markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);

          const marker = new kakao.maps.Marker({
            // position: createdMap.getCenter(),
            image: markerImage,
          });

          //! 마커 위에 있는 customOverlay (= Do Run 버튼)
          const customOverlay = new kakao.maps.CustomOverlay({
            clickable: true,
            content: customOverlayContent,
          });

          //! 마커 클릭 이벤트 : 마커를 클릭하면 customOverlay 오픈
          marker.addListener('click', function () {
            customOverlay.setMap(createdMap);
            customOverlay.getVisible(true);
            customOverlay.setPosition(marker.getPosition());
          });
          marker.setMap(createdMap);

          //! 기본 세팅 이외의 부분을 클릭(터치)하면 그곳으로 마커 이동 + 해당 좌표 반환 + 기존의 customOverlay 닫힘
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
          customOverlayContent.addEventListener('click', () => {
            setCreateModalPosition('createUp');
          });
        }













        //! 기존에 생성 돼 있는 크루를 렌더
        markerdata.forEach((el) => {
          // 마커를 생성
          let marker = new kakao.maps.Marker({
            // 마커가 표시 될 지도
            map: createdMap,
            // 마커가 표시 될 위치
            position: new kakao.maps.LatLng(el.lat, el.lng),
            // 마커에 hover시 나타날 title
            title: el.title,
          });
          kakao.maps.event.addListener(marker, 'click', function () {
            setCrewModalPosition('up');
          });
        })

      });

    };
  };

  useEffect(() => {
    createMap();
  }, []);

  return (
    <>
      <div id="Mymap">
        <div className={createModalPosition}>
          <CreateModal createModalHandler={createModalHandler} />
        </div>
        <div className={crewModalPosition}>
          <CrewModal crewModalHandler={crewModalHandler} />
        </div>
      </div>
    </>
  );
};

export default Map;