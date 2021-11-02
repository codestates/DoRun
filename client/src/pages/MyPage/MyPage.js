import React from 'react';
import { Route, Link } from 'react-router-dom';
import Logout from '../../components/Logout/Logout';
import Footer from '../../components/Footer/Footer';

const MyPage = ({ match }) => {
  return (
    <>
      <Logout />

      <Footer />
    </>
  );
};

export default MyPage;
