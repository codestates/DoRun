import React from 'react'
import './Footer.scss'

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__wrap">
        <div className='footer__logo'>
          <img src='DoRun.png' alt='' width='200px' height='50px'/>
        </div>
    
        <div className='footer__wrap__contents'>
          <div className="footer__wrap__content">
            <div className='footer__title'>About</div>
            <a href="https://github.com/codestates/DoRun/wiki" target="_blank" rel="noopener noreferrer">
              Wiki
            </a>
            <a href="https://github.com/codestates/DoRun" target="_blank" rel="noopener noreferrer">
              Client {'&'} Server
            </a>
          </div>

          <div className="footer__wrap__content">
            <div className='footer__title'>Contact</div>
              <div>
                <a href="https://github.com/95mg" target="_blank" rel="noopener noreferrer">
                  김민경
                </a>
                <a href="https://github.com/raonzane" target="_blank" rel="noopener noreferrer">
                  김현수
                </a>
              </div>
              <div>
                <a href="https://github.com/Mokodoko" target="_blank" rel="noopener noreferrer">
                  안지균
                </a>
                <a href="https://github.com/chayezo" target="_blank" rel="noopener noreferrer">
                  차예진
                </a>
              </div>
          </div>
        </div>


			</div>
			<div className="footer__copyright">
        <p>Copyright © 2021 DoRun All rights reserved.</p>
      </div>
		</div>
	);
}

export default Footer


// https://github.com/95mg
// https://github.com/raonzane
// https://github.com/Mokodoko
// https://github.com/chayezo