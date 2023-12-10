// index.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/vizbook/intro'); // Redirects to /vizbook
  }, [router]);

  return null;
};

export default Home;
