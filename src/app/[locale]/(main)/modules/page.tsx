"use client";

import { PageHeader } from "@/components/dashboard/projectProgress/PageHeader";
import { StatusBadge } from "@/components/dashboard/projectProgress/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { Module } from "@/types/module";
import { ArrowRight, Calendar, User } from "lucide-react";

import { useEffect, useState } from "react";

export default function ModulesListPage() {
  const router = useRouter();
  const { data, isLoading } = useGet("/project-modules", ["project-modules"]);
  const [modules, setModules] = useState<Module[]>();

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      setModules(data?.data);
    }
  }, [data]);
  const handleModuleClick = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Project Modules"
          description="Manage and track all your project modules in one place"
        />

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {modules && modules.length} Total Modules
            </Badge>
            <Badge
              variant="secondary"
              className="text-lg px-4 py-2 text-green-700"
            >
              {modules?.filter((m) => m.status === "COMPLETED").length}{" "}
              Completed
            </Badge>
            <Badge
              variant="secondary"
              className="text-lg px-4 py-2 text-blue-700"
            >
              {modules?.filter((m) => m.status === "IN_PROGRESS").length} In
              Progress
            </Badge>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="mb-4">
                <CardHeader className="bg-gray-200">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules?.map((module) => (
              <Card
                key={module.id}
                className="shadow-lg border-0 bg-[#d4d4d4ec] backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleModuleClick(module.id)}
              >
                <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 group-hover:text-white transition-colors">
                        {module.name}
                      </CardTitle>
                      <CardDescription
                        className="text-slate-200 text-sm line-clamp-2 rich-text-content"
                        dangerouslySetInnerHTML={{ __html: module.description }}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <StatusBadge status={module.status} />
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {module.clientCount} clients
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Created:{" "}
                          {new Date(module.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Updated:{" "}
                          {new Date(module.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 group-hover:border-blue-500 group-hover:text-blue-600 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick(module.id);
                      }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
