/* eslint-disable @next/next/no-img-element */
"use client";
import { rssSources } from "../../../api/rss-sources";
import API from "../../../api";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { cn } from "@/lib/utilities";

// const dummyArticle = {
//   title: "New Article TWO",
//   caption: "A new caption for the article TWO",
//   content: "This is the content of the article TWO",
//   imgUrl: "https://example.com/image.jpg",
//   tags: ["news", "tech"],
//   source: "Tech News",
//   sourceUrl: "https://example.com/source",
// };

export default function DiscoverPage() {
  const [mapItems, setMapItems] = useState<FeedItem[]>([]);
  const [selectedSource, setSelectedSource] = useState<RssSource | null>(rssSources[0]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(selectedSource) fetchRssData(selectedSource.url, !!selectedSource.jsonResponse);
  }, [selectedSource]);

  const fetchRssData = async (url: string, isJSON: boolean) => {
    setLoading(true);
    if (!isJSON) {
      const { data: rssData, error } = await API.feed.rss(url);
      if (rssData) setMapItems(rssData);
      else if (error) console.log("Error:", error);
    } else {
      const { data: jsonData, error } = await API.feed.json(url);
      if (jsonData) setMapItems(jsonData);
      else if (error) console.log("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-full flex">
      <div className="min-w-[500px] max-w-[500px] h-full py-1 px-2 rounded-sm">
        <h4 className="font-semibold text-sm text-indigo-600 mb-1">Article Feeds:</h4>
        <div className="w-full flex flex-col gap-1">
          {rssSources.map((source: RssSource) => {
            const isSelected = selectedSource?.name === source.name;
            return(
              <div
                onClick={() => setSelectedSource(source)}
                key={source.name}
                className={cn("w-full border p-2 flex items-center gap-4 cursor-pointer transition-all duration-300 ease-out scale-100 hover:scale-[1.02]", isSelected ? "bg-indigo-500 text-white": "")}
              >
                <img
                  className="h-[80px] w-[80px] border"
                  src={source.imgUrl}
                  alt={`${source.name}_logo`}
                />
                <h2 className="font-semibold">{source.name}</h2>
              </div>
            )
          })}
        </div>
      </div>
      <div className="grow h-full p-4 py-0 flex flex-col gap-1 overflow-y-scroll">
        {loading ? (
          <div>Loading...</div>
        ) : (
          mapItems?.map((item: FeedItem) => (
            <ListItem
              key={item.name}
              item={item}
              buttons={{ open: true, add: true }}
              selected={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
