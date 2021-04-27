/* eslint-disable prettier/prettier */
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../framework/src/components/Header';
import { useHospitals } from '../hooks/hospital';
import { useRouter } from 'next/router';

const MainPage = ({ hospitals }) => {
  const router = useRouter();
  const {
    query: { slug }
  } = router;

  const { data: hospitalList, isLoading, isValidating } = useHospitals({ limit: 10, offset: 0, hospitals });
  console.log(hospitalList);
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
              <table className="table table-borderless one-rem-mt">
                <tr>
                  <th>Hosoital</th>
                  <th className="text-center">Available Beds</th>
                  <th className="text-right">City</th>
                </tr>
                {!isLoading &&
                  hospitalList &&
                  hospitalList.length &&
                  hospitalList.map(item => {
                    const maxQuantity = item.bundle_id ? item.max_quantity : item.product_max_quantity;
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td className="text-center whitespace-nowrap">
                          <button
                            className="btn btn-sm  py-0"
                            disabled={item.quantity == 0}
                            onClick={() => this.onChangeQuantity('-', item)}
                          >
                            <i className={`icon-${item.quantity > 1 ? 'minus' : 'delete'} text-primary`} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm py-0"
                            disabled={item.quantity >= maxQuantity}
                            onClick={() => this.onChangeQuantity('+', item)}
                          >
                            <i className="icon-plus text-primary" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>
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

export async function getServerSideProps({ req, res, query: { limit, offset } }) {
  try {
    const response = await axios({
      url: `${API_URL}/hospital/list`,
      method: 'GET'
    });
    if (response) {
      const hospitals = get(response, 'data', []);
      return { hospitals };
    }
    return { props: { hospitals } };
  } catch (error) {
    res.statusCode = 404;
    return { props: { error: 404 } };
  } finally {
    console.log('done');
  }
}

export default MainPage;
