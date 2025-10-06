import NewsCard from "./NewsCard";
import { INews } from "./types/news";

export default function NewsLibrary({
   news
}: {
  news: INews[]
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news
            .map((news, index) => (
              <NewsCard
                key={index}
                {...news}
                // location={`/training/${course.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
