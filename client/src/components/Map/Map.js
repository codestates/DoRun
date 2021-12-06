/*global kakao*/
import React, { useState, useEffect } from 'react';
import CreateModal from '../_Modal/CreateModal/CreateModal';
import CrewModal from '../_Modal/CrewModal/CrewModal';
import './Map.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;
const { REACT_APP_KAKAO_MAP } = process.env;
import { useSelector } from 'react-redux';

const Map = () => {
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);

  const [state, setState] = useState(true);
  const [map, setMap] = useState(null);
  const [crewIdInfo, setCrewIdInfo] = useState(0);
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
    let container = document.getElementById('Mymap');
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKAO_MAP}&autoload=false`;
    document.body.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        let options = {
          center: new kakao.maps.LatLng(37.52406330545825, 126.98054529969014),
          level: 7,
          mapTypeId: kakao.maps.MapTypeId.ROADMAP,
          draggable: true,
          disableDoubleClickZoom: false,
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);
        // ----------------------------------------------------------------------- basic setting

        //! userID가 있고, Crew에 속해있지 않은 사람에게 crewCreate 마커 생성
        if (userId && userCrewId === null) {
          //! 크루 생성 마커 이미지
          var createMarkerImgSrc =
            'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
          var imageSize = new kakao.maps.Size(35, 35);
          var markerImage = new kakao.maps.MarkerImage(
            createMarkerImgSrc,
            imageSize
          );

          const createMarker = new kakao.maps.Marker({
            image: markerImage,
          });

          //! 마커 위 customOverlay (= Do Run 버튼)
          const customOverlay = new kakao.maps.CustomOverlay({
            clickable: true,
            content: customOverlayContent,
          });

          //! 마커 클릭 이벤트 : 마커를 클릭하면 customOverlay 오픈
          createMarker.addListener('click', function () {
            customOverlay.setMap(createdMap);
            customOverlay.getVisible(true);
            customOverlay.setPosition(createMarker.getPosition());
          });
          createMarker.setMap(createdMap);

          //! 커스텀 오버레이 클릭 이벤트: 커스텀 오버레이를 클릭하면 모달로 연결
          customOverlayContent.addEventListener('click', () => {
            setCreateModalPosition('createUp');
            setCrewModalPosition('down');
          });

          // console.log('생성마커 모달 값', createModalPosition)

          //! createMarker 이외의 지도 클릭시: 해당 좌표(위치)반환
          //! 열려 있던 customOverlay, crewCreate 모달 닫힘

          kakao.maps.event.addListener(
            createdMap,
            'click',
            function (mouseEvent) {
              // console.log(
              //   '생성마커 모달 값 in 지도 이벤트',
              //   createModalPosition
              // );
              var latlng = mouseEvent.latLng;
              createMarker.setPosition(latlng);
              let overlayPosition = customOverlay.getPosition();
              let createMarkerPosition = createMarker.getPosition();
              overlayPosition = createMarkerPosition;

              if (overlayPosition !== customOverlay) {
                customOverlay.setMap(null);
                setCreateModalPosition('createDown');
                setCrewModalPosition('down');
              }
              if (createMarker.getPosition()) {
                setCreateMarkerposition({
                  Ma: createMarkerPosition.Ma,
                  La: createMarkerPosition.La,
                });
              }
            }
          );
        }

        //! 기존에 생성 돼 있는 크루를 렌더
        var crewMarkerImgSrc =
          'https://cdn4.iconfinder.com/data/icons/social-media-2070/140/_location-128.png';
        var imgSize = new kakao.maps.Size(35, 35);
        var crewMarkerImg = new kakao.maps.MarkerImage(
          crewMarkerImgSrc,
          imgSize
        );

        //! 지도 위에 기존 크루의 정보를 띄우는 함수
        async function callCrewData() {
          await axios
            .get(`${process.env.REACT_APP_SERVER}/crew`)
            .then((res) => {
              //! 단순히 지도에 렌더만 담당(forEach)
              let crewData = res.data.data;
              // console.log();
              // console.log('지도 렌더 시에 렌더 되는 내용들입니다', res);
              crewData.forEach((el) => {
                // console.log('크루 데이터 속', el)
                let Ma = el.locationMa;
                let La = el.locationLa;
                // 마커를 생성
                let joinMarker = new kakao.maps.Marker({
                  image: crewMarkerImg,
                  // 마커가 표시 될 지도
                  map: createdMap,
                  // 마커가 표시 될 위치
                  position: new kakao.maps.LatLng(Ma, La),
                  // 마커에 hover시 나타날 title
                  // 여기서는 crewId를 할당
                  title: el.id,
                });

                joinMarker.addListener('click', function () {
                  setCrewModalPosition('up');
                  setCreateModalPosition('down');
                  // console.log('정보 좀 줘', joinMarker.getPosition())
                  // console.log('크루 아이디로 정보를 주세요', joinMarker.Gb)
                  const joinMarkerId = joinMarker.Gb;
                  // console.log('마커의 데이터', joinMarkerId);
                  // setCrewIdInfo('왜 안 될까')

                  setCrewIdInfo(joinMarkerId);
                });
              });
            })
            .catch((e) => {
              console.log('생성된 크루정보 요청에 대한 에러입니다.', e);
            });
        }

        callCrewData();
      });
    };
  };

  useEffect(() => {
    if (state) {
      createMap();
    }
    return () => setState(false); // useEffect console err
  }, []);

  return (
    <>
      <div id="Mymap">
        <div className={createModalPosition}>
          <CreateModal
            createModalHandler={createModalHandler}
            location={createMarkerposition}
          />
        </div>
        <div className={crewModalPosition}>
          <CrewModal crewModalHandler={crewModalHandler} crewId={crewIdInfo} />
        </div>
      </div>
    </>
  );
};

export default Map;
