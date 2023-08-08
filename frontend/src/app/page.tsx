import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the Map component, { ssr: false } ensures it will only be loaded & rendered client-side
const Map = dynamic(() => import('../components/map'), {
  ssr: false, // This will load the component only on the client side
  loading: () => <p>Loading...</p> // Optional loading component/message
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="hidden w-full md:block md:w-auto">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">citydao.network</a>
            </li>
            <li>
              <a href="/directory" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">directory</a>
            </li>
            <li>
              <a href="https://app.charmverse.io/citydaonetwork/page-19377272787222233" target="_blank" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">docs</a>
            </li>
          </ul>
        </div>
      </nav>
        {/* // <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-md lg:flex">
        // <p className="fixed left-0 top-0 flex w-full text-black justify-left pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4">
        // citydao.network
        // </p>
        // <div className="flex">
        // <Link className="fixed flex w-full text-black justify-center pb-2 pt-2 lg:static lg:w-auto lg:rounded-xl lg:p-2" href="/directory">
        //     directory
        // </Link>
        // <a className="fixed flex w-full text-black justify-center pb-2 pt-2 lg:static lg:w-auto lg:rounded-xl lg:p-2" href="https://app.charmverse.io/citydaonetwork/page-19377272787222233" target="_blank">
        //     docs
        // </a>
        // </div>
        
        // </div> */}
        <div className="fixed bottom-0 left-0 h-2/3 w-full">
            <Map />
        </div>
    </main>
  )
}
