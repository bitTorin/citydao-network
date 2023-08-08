'use client'

import {useEffect, useMemo, useRef, useState} from 'react';

import { ListingItem } from '@/components/listing';
import cities from '../data/dao_list.json';

export default function Directory() {

    const entries = useMemo(
        () =>
          cities.map((city, index) => (
            <ListingItem
              key={`marker-${index}`}
              Name={city.Name}
              City={city.City}
              Discord={city.Discord}
              Telegram={city.Telegram}
              Twitter={city.Twitter}
            >
            </ListingItem>
          )),
        []
      );

    return (
        [entries]
    )
}
