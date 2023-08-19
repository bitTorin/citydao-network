'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
 
export default function ListingItem(props:any) {

  return (
    <div className="flex w-full justify-between bg-white px-16 py-4">
      {/* <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none black">{props.Name}</h4>
        <p className="text-sm text-muted-foreground">
          {props.City}
        </p>
      </div>
      <Separator className="shrink-0 bg-border h-[1px] w-full my-4" /> */}
      
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" >
            <AccordionTrigger>
              <div className="px-8">
                <Avatar>
                  <AvatarImage src={`/atxdao.jpeg`} alt="ATX DAO" />
                  <AvatarFallback>ATX DAO</AvatarFallback>
                </Avatar>
                <div>
                  ATX DAO
                </div>
              </div>
              <div>
                Austin, Texas
              </div>
            </AccordionTrigger>
          <AccordionContent>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>X</div>
            <Separator orientation="vertical" />
            <div>Discord</div>
            <Separator orientation="vertical" />
            <div>Telegram</div>
          </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}