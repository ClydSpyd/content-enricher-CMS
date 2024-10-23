"use client";
import { Dispatch, SetStateAction, Suspense } from "react";
import QueueItem from "./queue-item";

export default function Queue({
  onSelect,
  selectedId,
  items,
}: {
  onSelect: Dispatch<SetStateAction<FeedItem | null>>;
  selectedId: string;
  items: FeedItem[];
}) {
  return (
    <Suspense fallback={<div>Loading queued items...</div>}>
      <div className="flex flex-col gap-1 pr-4">
        {items?.map((item: FeedItem) => (
          <div
            onClick={() => {
              onSelect(item);
            }}
            key={item.name}
          >
            <QueueItem item={item} selected={selectedId === item.url} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
