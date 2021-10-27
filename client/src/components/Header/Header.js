import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Nav>
        <Logo href="/">
          <img src="DoRun.png" alt="logo" width="120px" />
        </Logo>

        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>

        <NavMenu isOpen={isOpen}>
          <NavLink to="/map">DoRun!</NavLink>
          <NavLink to="/mypage">MyPage</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">SignUp</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const Nav = styled.div`
  height: 5rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  padding: 1rem 2rem;

  &.active {
    color: #3bc9db;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-right: -24px;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
    height: 500px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: black;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
    margin: 1rem;
  }
`;
