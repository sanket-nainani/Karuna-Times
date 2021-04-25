import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { openInNewTab } from '../helpers';
import sample from '../../../public/static/images/default.png';

const Footer = () => {
  const renderFooter = () => {
    return (
      <>
        <div className="footer-top-section ">
          <div className="container footer-top-section-inner ">
            <div className="website-section">
              <img className="logo" src={sample} />
              <h6 className="half-rem-mt">Covid 19 Information</h6>
              <IconHolder />
            </div>
            <div className="other-info-section"></div>
            <div className="other-info-section"></div>
            <div className="other-info-section">
              <h5 className="section-title bold">Karuna</h5>
              <Link href="/aboutus">
                <a className="footer-links ">About Us</a>
              </Link>
              <Link href="/faq">
                <a className="footer-links ">FAQ</a>
              </Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">
                <a className="footer-links ">Contact</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom-section py-2">
          <div className="d-lg-flex justify-content-between flex-column flex-lg-row align-items-center container">
            <div className="left-sec text-center">{`Copyright© 2018-2020 Karuna Times All rights reserved.`}</div>
            <div className="right-sec text-center d-block d-lg-flex align-items-center ">
              <div className="footer-links">
                <div className="item">
                  <a href="/privacypolicy" target="_blank" className="footer-links">
                    Privacy Policy
                  </a>
                </div>
                <div className="item">
                  <a href="/termsandconditions" target="_blank" className="footer-links">
                    Terms of Use
                  </a>
                </div>
              </div>
              <IconHolder />
            </div>
          </div>
        </div>
      </>
    );
  };
  return <DnoneFooter>{renderFooter()}</DnoneFooter>;
};
const DnoneFooter = ({ children }) => {
  return <div className="footer  un-fixed-footer d-none d-lg-block has-box-shadow-top">{children}</div>;
};

const goSocialPage = link => {
  // open in a new page
  openInNewTab(link);
};

const IconHolder = () => {
  return (
    <div className="icon-holder">
      <a onClick={() => goSocialPage('/insta')} rel="noopener noreferrer" target="_blank">
        <i className="icon-instagram" />
      </a>
      <a onClick={() => goSocialPage('/fb')} rel="noopener noreferrer" target="_blank">
        <i className="icon-facebook" />
      </a>
      <a onClick={() => goSocialPage('/twitter')} rel="noopener noreferrer" target="_blank">
        <i className="icon-twitter" />
      </a>
    </div>
  );
};
export default withRouter(Footer);
