/*global kakao*/
import React, { useEffect, useState } from 'react';
import { markerdata } from './markerData';

const { kakao } = window;

const KakaoMap = () => {
  const [is_modal, setModal] = useState(false);

  useEffect(() => {
    createMap();
  }, []);

  const createMap = () => {
    let container = document.getElementById('myMap');
    let options = {
      center: new kakao.maps.LatLng(37.53852169180882, 126.90221133835973),
      level: 6,
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
        alert('마커를 클릭했습니다!');
      });
    });
  };

  return (
    <>
      <div id="myMap" style={{ width: '100vw', height: '100vh' }}></div>
    </>
  );
};

export default KakaoMap;
