import { Separator } from "@/components/ui/separator"
 
export function ListingItem(props) {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">{props.Name}</h4>
        <p className="text-sm text-muted-foreground">
          {props.City}
        </p>
      </div>
      <Separator className="shrink-0 bg-border h-[1px] w-full my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>X</div>
        <Separator orientation="vertical" />
        <div>Discord</div>
        <Separator orientation="vertical" />
        <div>Telegram</div>
      </div>
    </div>
  )
}