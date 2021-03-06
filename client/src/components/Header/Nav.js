import React, { useState } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const userId = useSelector((state) => state.user.userId);
  return (
    <>
      <header>
        <div
          className={click ? 'main-container' : ''}
          onClick={() => Close()}
        />
        <nav className="navbar" onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            {/* <a className="nav-logo" href="/">
              <img src="/DoRun.png" alt="logo" width="120px" />
            </a> */}
            <NavLink
              to='/'
              onClick={click ? handleClick : null}
            >
              <div className="nav-logo" >
                <img src="/DoRun.png" alt="logo" width="120px" />
              </div>
            </NavLink>

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
              {!userId ? (
                <>
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
                </>
              ) : (
                <>
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
                    <Logout />
                  </li>
                </>
              )}
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {click ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
