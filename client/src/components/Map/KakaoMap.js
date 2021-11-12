/*global kakao*/
import React, { useEffect, useState } from 'react';
import { markerdata } from './markerData';
import './KakaoMap.scss';
import CrewModal from '../CrewModal/CrewModal';
const { kakao } = window;

const KakaoMap = () => {
  const [crewModalPosition, setCrewModalPosition] = useState('down');

  const crewModalHandler = () => {
    crewModalPosition === 'down'
      ? setCrewModalPosition('up')
      : setCrewModalPosition('down');
  };

  useEffect(() => {
    createMap();
  }, []);

  const createMap = () => {
    let container = document.getElementById('myMap');
    let options = {
      center: new kakao.maps.LatLng(37.52805120266989, 126.98002145551034),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    markerdata.forEach((el) => {
      // 마커를 생성
      let marker = new kakao.maps.Marker({
        // 마커가 표시 될 지도
        map: map,
        // 마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        // 마커에 hover시 나타날 title
        title: el.title,
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        setCrewModalPosition('up');
      });
    });
  };

  return (
    <>
      <div
        id="myMap"
        className="myMap"
        style={{ width: '100vw', height: '100vh' }}
      ></div>
      <div className={crewModalPosition}>
        <CrewModal crewModalHandler={crewModalHandler} />
      </div>
    </>
  );
};

export default KakaoMap;
