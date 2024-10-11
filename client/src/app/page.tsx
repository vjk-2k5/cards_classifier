import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page of the website.</p>
      <Link href="/about">
        <Button asChild>
          <h1>Go to About Page</h1>
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
