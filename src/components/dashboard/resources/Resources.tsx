"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/hooks/useGet";
import { IUserRole } from "./types/types";

export default function Resources() {
    const { data, isLoading } = useGet<IUserRole[]>(
        "/user/organizations-role",
        ["organizations-role"],
        
      );
  return (
   <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resources</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Tabs defaultValue={data?.data?.[0]?.id?.toString()} className="w-full">
          <TabsList className="mb-4 overflow-x-auto whitespace-nowrap">
            {data?.data?.map((resource) => (
              <TabsTrigger key={resource.id} value={resource.id.toString()}>
                {resource.organizationName}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  )
}
