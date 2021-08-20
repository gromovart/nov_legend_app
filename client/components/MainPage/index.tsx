import React from 'react';
import Header from '../Common/Header';
import ChooseBlock from './ChooseBlock';
import PageHeader from './PageHeader';
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
