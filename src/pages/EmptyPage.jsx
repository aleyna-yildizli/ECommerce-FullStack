import { PiPiggyBankDuotone } from "react-icons/pi";
import { Textarea, Button, IconButton } from "@material-tailwind/react";

export default function EmptyPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center text-center text-[50px] font-bold  text-slate-800 -tracking-tight py-[70px]">
        <span> For All Your Needs, There's Only One Place: </span>
        <span className="text-pink-400">PiggyBank!</span>
      </div>
      <div className="relative w-[32rem]">
        <Textarea
          variant="outlined"
          placeholder="Send us a message to sell on PiggyBank. "
          rows={8}
        />
        <div className="flex w-full justify-between py-1.5">
          <IconButton variant="text" color="gray" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </IconButton>
          <div className="flex gap-2">
            <Button size="sm" color="red" variant="text" className="rounded-md">
              Cancel
            </Button>
            <Button size="sm" className="rounded-md text-black">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
