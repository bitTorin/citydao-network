'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import logo from '@/components/assets/logo.jpeg';

export default function Nav() {

    const pathname = usePathname()
    //const isActive = pathname === link.href

    return(
        <nav className="fixed relative flex w-full justify-between align-center bg-white px-24 py-8">
            <div className="flex flex-nowrap items-center">
                <div className="flex-shrink-0 pr-2">
                    <Image
                        className="h-10 w-10"
                        src={logo}
                        alt="citydao.network"
                    />
                </div>
                <div className="hidden md:block justify-self-start font-mono text-blue-700">citydao.network</div>
            </div>
            <div className="align-self-end md:block md:w-auto">
                <ul className="flex font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 font-mono rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">map</Link>
                    </li>
                    <li>
                        <Link href="/directory" className="block py-2 pl-3 pr-4 text-gray-900 font-mono rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">directory</Link>
                    </li>
                    <li>
                        <Link href="/docs" className="block py-2 pl-3 pr-4 text-gray-900 font-mono rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">docs</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}