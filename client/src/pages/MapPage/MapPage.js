import React from 'react';
import Map from '../../components/Map/Map';
import { useDispatch } from 'react-redux';
import { kakaoUser } from '../../_actions/user_action';
import axios from 'axios';

const MapPage = () => {
  
  return (
    <>
      <Map />
    </>
  );
};

export default MapPage;
