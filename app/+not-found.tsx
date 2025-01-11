import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to the home page
    router.replace('/');
  }, [router]);

  return null; // No need to render anything since it immediately redirects
};

export default NotFound;
