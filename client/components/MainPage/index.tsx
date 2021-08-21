import React from 'react';
import dynamic from 'next/dynamic';
import ChooseBlock from './ChooseBlock';
import PageHeader from './PageHeader';

const Header = dynamic(() => import('../Common/Header'), {
  ssr: false,
});
// import style from './styled.module.scss';

const MainPage = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <PageHeader />
      <ChooseBlock />
    </>
  );
};

export default MainPage;
