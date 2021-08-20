import Image from 'next/image';

const PageHeader = () => {
  return (
    <header style={{ paddingTop: '200px' }}>
      <div>
        <h2>Легенда О Медведях Убийцах</h2>
      </div>
      <div>
        <Image
          src="/medved.jpg"
          alt="medved"
          width="120"
          height="120"
          quality={80}
          objectFit="contain"
        />
      </div>
    </header>
  );
};

export default PageHeader;
