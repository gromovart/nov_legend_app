import Link from 'next/link';
import Layout from '../components/Layout';
import MapComponent from '../components/Common/Map';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about" passHref>
        <a>About</a>
      </Link>
    </p>
    <MapComponent />
  </Layout>
);

export default IndexPage;
