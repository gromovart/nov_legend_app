import React from 'react';
import dynamic from 'next/dynamic';
import CarouselComponent from './Carousel';
import Footer from '../Common/Footer';

const Header = dynamic(() => import('../Common/Header'), {
  ssr: false,
});
const GalleryPage = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <CarouselComponent />
      <Footer />
    </>
  );
};

export default GalleryPage;
