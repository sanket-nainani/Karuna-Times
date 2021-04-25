/* eslint-disable prettier/prettier */
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../framework/src/components/Header';

const SubmitOpportunities = () => {
  return (
    <>
      <Head>
        <title>{`Karuna Times | Covid Information Simplified`}</title>
      </Head>
      <Header hasText toPath="/" hasWhiteBg hasShadow />
      <div id="KarunaTimes" className="partner">
        <div
          className="hero-img-container submit-op"
          style={{
            backgroundImage: `url(/static/images/lightBulb.png)`
          }}
        >
          <div className="hero-img-container-inner container">
            <div className="content-box">
              <h5 className="one-rem-mt bold title">Partnership Opportunities</h5>
              <p className="sub-title">
                We are constantly on the hunt for unique marketing opportunities and the chance to collaborate.
              </p>
            </div>
          </div>
        </div>
        <div className="inner container">
          <h6 className="one-rem-mt bold">Partnership Opportunities</h6>
          <p>
            {`The Karuna times team is constantly on the hunt for unique helping opportunities, innovative products, and
            the chance to collaborate with anyone making efforts to help people with the pandemic.
            Please reach out to us with anything you feel is compelling or relevant and we will point you in the right
            direction. Thank you for reaching out!`}
          </p>
          <div className="text-center two-rem-mb ">
            <Link href="/contact">
              <a to="/contact" className="btn btn-primary padding-btn res-btn-block has-box-shadow" role="button">
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitOpportunities;
