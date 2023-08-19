'use client'

import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Transition } from "@headlessui/react";

import logo from '@/components/assets/logo.jpeg';

function Nav2() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="flex-no-wrap relative flex w-full justify-items-stretch bg-white h-4 px-24 py-8">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
                <div className="flex items-center">
                    <div className="flex-shrink-0 pr-2">
                        <Image
                            className="h-8 w-8"
                            src={logo}
                            alt="citydao.network"
                        />
                    </div>
                    <div className="sm:hidden md:block justify-self-start font-mono text-blue-700">citydao.network</div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex font-mono items-baseline space-x-4">
                        <Link
                        href="/"
                        className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                        map
                        </Link>

                        <Link
                        href="/directory"
                        className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                        directory
                        </Link>

                        <Link
                        href="/docs"
                        className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                        docs
                        </Link>
                    </div>
                </div>
            <div className="-mr-2 flex md:hidden">
                <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                    <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                ) : (
                    <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                )}
                </button>
            </div>
            </div>
        </div>

        <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            {(ref) => (
            <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                    href="/"
                    className="hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    map
                </Link>

                <Link
                    href="/directory"
                    className="text-black hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    directory
                </Link>

                <Link
                    href="/docs"
                    className="text-black hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    docs
                </Link>
                </div>
            </div>
            )}
        </Transition>
        </nav>
    );
}

export default Nav2;