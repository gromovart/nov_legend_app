import React from 'react';
import Header from '../common/Header';
import PageHeader from './PageHeader';
import style from './styled.module.scss';

const MainPage = () => {
  return (
    <>
      <div className={style.container}>
        <Header />
      </div>
      <PageHeader />
    </>
  );
};

export default MainPage;
