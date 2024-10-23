import { MdOutlineOpenInNew } from "react-icons/md";
import Image from "next/image";
import { cn } from "@/lib/utilities";

export default function QueueItem({
  item,
  selected,
}: {
  item: FeedItem;
  selected: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full border p-2 flex items-center gap-4 cursor-pointer rounded-sm transition-all duration-300 ease-out scale-100 hover:scale-[1.02]",
        selected ? "bg-indigo-500 text-white" : ""
      )}
    >
      <div className="min-h-[80px] min-w-[80px] border relative">
        <Image
          layout="fill"
          objectFit="cover"
          src={item.imgUrl}
          alt={`${item.name}_logo`}
        />
      </div>
      <div className="grow">
        <h2 className="font-semibold">{item.name}</h2>
      </div>

      <a className={cn(selected?"pointer-events-auto":"pointer-events-none")} href={item.url} target="_blank" rel="noreferrer">
        <div
          className={cn(
            "h-[35px] w-[35px] flex items-center justify-center bg-white border border-white rounded-md cursor-pointer hover:bg-indigo-400 hover:border-white transition-all duration-300 group",
            selected
              ? "pointer-events-all opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          <MdOutlineOpenInNew size={20} className="text-indigo-600 group-hover:text-white" />
        </div>
      </a>
    </div>
  );
}
