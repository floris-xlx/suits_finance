import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectToRoot = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/journal');
  }, [router]);

  return null;
};

export default RedirectToRoot;
