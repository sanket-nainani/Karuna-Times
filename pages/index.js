/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
  const [infoOpen, setInfoOpen] = useState(false);

  function openInfo() {
    setInfoOpen(!infoOpen);
  }

  const { data: hospitalList, isLoading, isValidating } = useHospitals({ limit: 10, offset: 0, hospitals });
  console.log(hospitalList);
  return (
    <>
      <Head>
        <title>{`Karuna Times | Covid Information Simplified`}</title>
      </Head>
      <Header hasText toPath="/" hasWhiteBg hasShadow />
      <div id="KarunaTimes" className="partner cms-page">
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

                  <th className="text-center">Without Oxygen</th>
                  <th className="text-center">With Oxygen</th>
                  <th className="text-center">ICU</th>
                  <th className="text-center">Ventilators</th>
                  <th className="text-center">City</th>
                </tr>
                {!isLoading &&
                  hospitalList &&
                  hospitalList.length &&
                  hospitalList.map(item => {
                    const maxQuantity = item.bundle_id ? item.max_quantity : item.product_max_quantity;
                    return (
                      <tr className={`product text-left product-grid relative lazy-load-product-height`}>
                        <td>
                          <div>
                            {item.name} - {item.area_name}
                            <button
                              className="btn btn-sm py-0"
                              disabled={item.quantity >= maxQuantity}
                              onClick={() => openInfo()}
                            >
                              <i className="icon-plus text-primary" />
                            </button>
                          </div>
                          {infoOpen && (
                            <div>
                              <div className="mx-2">{item.address}</div>
                              {item.contact_person && <div className="mx-2">{item.contact_person}</div>}
                              {item.phone && <div className="mx-2">{item.phone}</div>}
                            </div>
                          )}
                        </td>
                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">
                            {item.available_bed}/{item.total_bed}
                          </span>
                        </td>

                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">
                            {item.available_bed_wo_oxygen}/{item.total_bed_wo_oxygen}
                          </span>
                        </td>
                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">
                            {item.available_bed_oxygen}/{item.total_bed_oxygen}
                          </span>
                        </td>
                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">
                            {item.available_bed_icu_wo_vent}/{item.total_bed_icu_wo_vent}
                          </span>
                        </td>
                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">
                            {item.available_bed_icu_vent}/{item.total_bed_icu_vent}
                          </span>
                        </td>

                        <td className="text-center whitespace-nowrap">
                          <span className="mx-2">{item.city_name}</span>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
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
