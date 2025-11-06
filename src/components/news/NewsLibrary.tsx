import NewsCard from "./NewsCard";
import { INews } from "./types/news";

export default function NewsLibrary({
  news,
  viewMode,
}: {
  news: INews[];
  viewMode?: string;
}) {
  return (
    <div>
      {news.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">
            The event will be available soon
          </h1>
          <p className="text-sm font-inter">
            Please select right resource type
          </p>
        </div>
      ) : (
        <div className={"flex flex-col gap-y-4 divide-y divide-gray-200"}>
          {news.map((news, index) => (
            <NewsCard key={index} {...news} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
