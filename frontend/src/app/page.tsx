import dynamic from 'next/dynamic';
import Link from 'next/link';

import Nav from '@/components/nav';

// Dynamically import the Map component, { ssr: false } ensures it will only be loaded & rendered client-side
const Map = dynamic(() => import('../components/map'), {
  ssr: false, // This will load the component only on the client side
  loading: () => <p>Loading...</p> // Optional loading component/message
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
      <div className="fixed bottom-0 left-0 h-4/5 w-full">
          <Map />
      </div>
    </main>
  )
}
