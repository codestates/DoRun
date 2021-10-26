import React from 'react';
import { Nav, NavLink, Bars, NavMenu } from './HeaderElements';

const Header = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src="DoRun.png" alt="logo" width="100px" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/map" activeStyle>
            DoRun!
          </NavLink>
          <NavLink to="/mypage" activeStyle>
            MyPage
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/register" activeStyle>
            SignUp
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
