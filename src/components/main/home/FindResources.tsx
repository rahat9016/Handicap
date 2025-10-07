"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGet } from "@/hooks/useGet";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useRouter } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FindResources() {
  const router = useRouter();
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data } = useGet<IResource[]>(
    "/resources",
    ["resources", debouncedSearch],
    { search: debouncedSearch },
    { enabled: shouldFetch }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e);
    setShouldFetch(e.target.value.trim().length > 0);
  };

  const handleSelectResource = (id: number) => {
    // navigate to resource detail page
    router.push(`/resources/${id}`);
  };
  return (
    <div
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url('/images/home/FindResourcesBg.png')` }}
    >
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Find Resources"
            desc="Access a wide range of materials designed to inform, support, and empower. Whether you're looking for training guides, policy documents, toolkits, or educational content"
          />

          <div className="w-full lg:w-7/12 mx-auto mt-[60px] relative">
            <div className="flex items-center gap-3">
              <Input
                value={search}
                onChange={handleInputChange}
                placeholder="Search for resources, guidelines, training materials..."
                className="border border-[#7297FF] h-[46px] focus:border-[#7297FF] placeholder:text-[#B7B7B7] bg-white"
              />
              <Button className="bg-[#2A53CD] text-white h-[46px] flex items-center font-inter text-sm font-medium px-6">
                <Search className="mr-2" />
                Search now
              </Button>
            </div>

            {shouldFetch && search && data && data?.data?.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border border-gray rounded-lg shadow-xl max-h-60 overflow-auto z-10 ">
                <div className="p-2 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm text-gray-600 font-medium">
                    Found {data.data.length} result
                    {data.data.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <ul className="py-1">
                  {data?.data?.map((resource: IResource) => (
                    <li
                      key={resource.id}
                      onClick={() => handleSelectResource(resource.id)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors text-base">
                          {resource.title.en}
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {resource.description.en}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Dropdown */}
            {/* {shouldFetch && search && data && data?.data?.length > 0 && (
              <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto z-50">
                {data?.data?.map((resource: IResource) => (
                  <li
                    key={resource.id}
                    onClick={() => handleSelectResource(resource.id)}
                    className="px-4 py-2 bg-[#e6e6e6] hover:bg-gray cursor-pointer text-base text-black border-b"
                  >
                    {resource?.title.en}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
