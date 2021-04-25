import React, { Component, useContext } from 'react';
import Router, { withRouter } from 'next/router';
import sample from '../../../public/static/images/faicon.png';
import appContext from '../../../Context/appContext';

const Header = ({
  pageName,
  hasShadow,
  centeredHeader,
  className,
  minimalNavbar,
  backPath,
  secondaryNavbarClassName,
}) => {
  const { state, dispatch } = useContext(appContext);

  function handleSideMenuClick() {
    dispatch({ type: 'toggleSidebar' });
  }


  function goBack() {
    const currentUrl = window.location.href;
    Router.back();
    setTimeout(() => {
      // if location was not changed in 100 ms, then there is no history back
      if (currentUrl === window.location.href) {
        // redirect to site root
        Router.push('/');
      }
    }, 100);
  }

  function goHome() {
    Router.push('/');
  }


  function renderComponentForNewHeader() {
    if (pageName) {
      return <div className=" logo-text bold">{pageName}</div>;
    }

    return (
      <div className="main-logo ">
        <img src={sample} onClick={goHome} alt={process.env.NEXT_PUBLIC_APP_NAME} />
      </div>
    );
  }

    return (
      <>
        <nav
          className={`navbar fixed-top header new-header ${hasShadow ? 'has-box-shadow' : ''}
           ${centeredHeader ? 'centered-header' : ''} ${className} ${minimalNavbar ? 'minimal-navbar' : ''}`}
        >
          <div className="container-fluid n-container">
            {backPath ? (
              <a className="btn left-btn" onClick={goBack}>
                <span className="icon-back" />
              </a>
            ) : (
              <button type="button" className="btn left-btn" onClick={handleSideMenuClick}>
                <span className="icon-hamburger" />
              </button>
            )}
            <div className="f-sec">{renderComponentForNewHeader()}</div>
            <div className="s-sec">
              <div className="t-search-bar relative cursor-pointer" >
                <input type="text" className="form-control" placeholder="Search" />
                <button type="button" className="btn ">
                  <i className="icon-search" />
                </button>
              </div>
            </div>
            <div className="t-sec">
            </div>

            <div className="right-btn-container">
            Icon
            </div>
          </div>
        </nav>
        <div className={`secondary-navbar ${minimalNavbar ? 'minimal-navbar' : ''} ${secondaryNavbarClassName}`}>
          <div className="s-sec">
            <div className="t-search-bar relative cursor-pointer" >
              <input type="text" className="form-control" placeholder="Search" />
              <button type="button" className="btn " >
                <i className="icon-search" />
              </button>
            </div>
          </div>
          <div className="t-sec">
          </div>
        </div>
      </>
    );

};

export default withRouter(Header);
