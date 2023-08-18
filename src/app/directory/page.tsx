'use client'

import {useEffect, useMemo, useRef, useState, Suspense} from 'react';

import { ListingItem } from '@/app/directory/listing';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Nav from '@/components/nav';
import daos from '../../data/dao_list.json';
import cityEmoji from '@/components/assets/emoji-cityscape-48.png';


export default function Page() {

    const entries = useMemo(
        () =>
          daos.map((dao, index) => (
            <TableRow>
              <TableCell>
                <Avatar className='bg-black'>
                  <AvatarImage src={"https://s3.amazonaws.com/charm.public/user-content/a951b927-31f4-4b53-9658-2cabf43b71c2/d3399ccb-d071-4fdf-8b8c-852a38796e55/atxdao.jpeg"} alt={dao.Name}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium bold">{dao.Name}</TableCell>
              <TableCell>{dao.City}</TableCell>
              <TableCell><a href={dao.Website} target="_blank">{dao.Website}</a></TableCell>
              <TableCell className="text-right"><a href={dao.Twitter} target="_blank">{dao.Twitter}</a></TableCell>
            </TableRow>
          )),
        []
      );

    return (
      <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
        <Nav />
        <Table className="inset-4">
          <TableBody>
            {entries}
          </TableBody>
        </Table>
      </main>
    )
}
