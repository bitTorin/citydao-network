import dynamic from 'next/dynamic';

// Dynamically import the Map component, { ssr: false } ensures it will only be loaded & rendered client-side
const Map = dynamic(() => import('../components/map'), {
  ssr: false, // This will load the component only on the client side
  loading: () => <p>Loading...</p> // Optional loading component/message
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-md lg:flex">
        <p className="fixed left-0 top-0 flex w-full text-black justify-left pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4">
          citydao.network
        </p>
        <div className="flex">
          <a className="fixed flex w-full text-black justify-center pb-2 pt-2 lg:static lg:w-auto lg:rounded-xl lg:p-2">
            directory
          </a>
          <a className="fixed flex w-full text-black justify-center pb-2 pt-2 lg:static lg:w-auto lg:rounded-xl lg:p-2" href="https://app.charmverse.io/citydaonetwork/page-19377272787222233" target="_blank">
            docs
          </a>
        </div>
        
      </div>
      <div className="fixed bottom-0 left-0 h-2/3 w-full">
        <Map />
      </div>
    </main>
  )
}
