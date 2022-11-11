import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Headphones of various types</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData.length && bannerData[1]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const productsPromise = client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerDataPromise = client.fetch(bannerQuery);

  const [products, bannerData] = await Promise.all([
    productsPromise,
    bannerDataPromise,
  ]);

  return {
    props: { products, bannerData },
  };
};

export default Home;
