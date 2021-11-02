import React, { useState } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <>
      <header>
        <div
          className={click ? 'main-container' : ''}
          onClick={() => Close()}
        />
        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            <a className="nav-logo" href="/">
              <img src="/DoRun.png" alt="logo" width="120px" />
            </a>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <NavLink
                  to="/map"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  DoRun!
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/mypage"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  MyPage
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/register"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  SignUp
                </NavLink>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
