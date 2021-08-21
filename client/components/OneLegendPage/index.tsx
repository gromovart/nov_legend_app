import dynamic from 'next/dynamic';
import PageHeader from './PageHeader';

const Header = dynamic(() => import('../Common/Header'), {
  ssr: false,
});

const OneLegendPage = () => {
  return (
    <div className="container">
      <Header />
      <PageHeader />
    </div>
  );
};

export default OneLegendPage;
