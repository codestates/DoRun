/*global kakao*/
import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import CreateModal from '../CreateModal/CreateModal';
import './Map.css';
import { markerdata } from './markerData';
import CrewModal from '../CrewModal/CrewModal';
import axios from 'axios';
const { REACT_APP_KAKAO_MAP } = process.env;

const Map = () => {

  useEffect(() => {
    createMap();

  }, []);


  const [map, setMap] = useState(null);
  const [crewModalPosition, setCrewModalPosition] = useState('down');
  const [createModalPosition, setCreateModalPosition] = useState('createDown');
  const [createMarkerposition, setCreateMarkerposition] = useState({}); //* 서버로 create crew의 좌표값을 보내주는 state

  const crewModalHandler = () => {
    crewModalPosition === 'down'
      ? setCrewModalPosition('up')
      : setCrewModalPosition('down');
  };

  const createModalHandler = () => {
    createModalPosition === 'createDown'
      ? setCreateModalPosition('createUp')
      : setCreateModalPosition('createDown');
  };

  //! 마커 위에 표시 될 customOverlay 내용
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
          draggable: true,
          disableDoubleClickZoom: false,
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);
        // ----------------------------------------------------------------------- basic setting

        //! userID가 있고, Crew에 속해있지 않은 사람에게 crewCreate 마커 생성
        if ((sessionStorage.getItem('userId') !== 'null') &&
          (sessionStorage.getItem('userCrewId') === 'null')) {

          //! 크루 생성 마커 이미지
          var createMarkerImgSrc =
            'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
          var imageSize = new kakao.maps.Size(35, 35);
          var markerImage = new kakao.maps.MarkerImage(createMarkerImgSrc, imageSize);

          const marker = new kakao.maps.Marker({
            image: markerImage,
          });

          //! 마커 위 customOverlay (= Do Run 버튼)
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

          //! 커스텀 오버레이 클릭 이벤트: 커스텀 오버레이를 클릭하면 모달로 연결
          customOverlayContent.addEventListener('click', () => {
            setCreateModalPosition('createUp');
          });

          console.log('생성마커 모달 값', createModalPosition)

          //! createMarker 이외의 지도 클릭시: 해당 좌표(위치)반환 + 열려 있던 customOverlay 닫힘
          kakao.maps.event.addListener(
            createdMap,
            'click',
            function (mouseEvent) {
              var latlng = mouseEvent.latLng;
              marker.setPosition(latlng);
              marker.setPosition(latlng);
              let overlayPosition = customOverlay.getPosition();
              let markerPosition = marker.getPosition();
              overlayPosition = markerPosition;

              if (overlayPosition !== customOverlay) {
                customOverlay.setMap(null);
                setCreateModalPosition('createDown');
              }
              if (marker.getPosition()) {
                console.log('지도에서의 crew 생성 마커 좌표입니다', markerPosition)
                setCreateMarkerposition({ Ma: markerPosition.Ma, La: markerPosition.La })
              }

            }
          );
        }






        //! 기존에 생성 돼 있는 크루를 렌더
        var crewMarkerImgSrc = 'https://cdn4.iconfinder.com/data/icons/social-media-2070/140/_location-128.png';
        var imgSize = new kakao.maps.Size(35, 35);
        var crewMarkerImg = new kakao.maps.MarkerImage(crewMarkerImgSrc, imgSize);


        //! 지도 위에 기존 크루의 정보를 띄우는 함수
        async function callCrewData() {
          await axios.get('http://localhost:3001/crew')
            .then((res) => {

              let crewData = res.data.data;
              // console.log('데이터 형 확인', crewData)
              // console.log('지도 컴포넌트입니다.',)
              // console.log('지도 컴포넌트입니다.',)


              crewData.forEach((el) => {

                let Ma = el.location.Ma;
                let La = el.loaction.La
                // 마커를 생성
                let marker = new kakao.maps.Marker({
                  image: crewMarkerImg,
                  // 마커가 표시 될 지도
                  map: createdMap,
                  // 마커가 표시 될 위치
                  position: new kakao.maps.LatLng(Ma, La),
                  // 마커에 hover시 나타날 title
                  title: el.title,
                });

                kakao.maps.event.addListener(marker, 'click', function () {
                  setCrewModalPosition('up');
                });
              })

            })
            .catch(e => {
              // console.log('생성된 크루정보 요청에 대한 에러입니다.', e)
            })
        }

        callCrewData();

      });

    };
  };


  return (
    <>
      <div id="Mymap">
        <div className={createModalPosition}>
          <CreateModal createModalHandler={createModalHandler} location={createMarkerposition} />
        </div>
        <div className={crewModalPosition}>
          <CrewModal crewModalHandler={crewModalHandler} />
        </div>
      </div>
    </>
  );
};

export default Map;