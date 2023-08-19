'use client'

import {useEffect, useMemo, useRef, useState, Suspense} from 'react';

import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Nav from '@/components/nav';
import ListingItem from '@/components/listing';
import daos from '../../data/dao_list.json';


export default function Page() {

    const entries = useMemo(
        () =>
          daos.map((dao, index) => (
            <TableRow key={dao.ID}>
              <TableCell>
                { dao.Avatar ? 
                  (<Avatar>
                    <AvatarImage src={`/${dao.Avatar}`} alt={dao.Name} />
                    <AvatarFallback>{dao.Name}</AvatarFallback>
                  </Avatar>)
                :
                  (<Avatar>
                    <AvatarImage src={"/logo.jpeg"} alt="citydao.network" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>)
              }
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
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Nav />
        {/* <ListingItem /> */}
        <Table className="inset-4">
          <TableBody>
            {entries}
          </TableBody>
        </Table>
      </main>
    )
}
