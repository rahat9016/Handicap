"use client";

import { PageHeader } from "@/components/dashboard/projectProgress/PageHeader";
import {
  StatusBadge,
  statusOptions,
} from "@/components/dashboard/projectProgress/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "@/i18n/navigation";
import { Module } from "@/types/module";
import dynamic from "next/dynamic";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const EditorWrapper = dynamic(() => import("../../../../../../components/share/EditorWrapper"), { ssr: false })


export default function ModuleFormPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { mutateAsync } = usePost(
    "/project-modules",
    (data) => {
      console.log("POST success", data);
    },
    [["project-modules"]]
  );
  const [formData, setFormData] = useState<Partial<Module>>({
    name: "",
    description: "",
    status: "",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.status) {
      toast.error("Please fill in the status field");
      return;
    }
    mutateAsync(formData).then(() => {
      setFormData({ name: "", description: "", status: "" });
      toast.success("Module created successfully");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Create New Module"
          description="Add a new module to your project portfolio"
        />

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-black">
              Module Information
            </CardTitle>
            <CardDescription className="text-black">
              Enter the basic details for your new module
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Module Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="moduleName"
                  className="text-lg font-semibold text-gray-700"
                >
                  Module Name
                </Label>
                <Input
                  id="moduleName"
                  placeholder="Enter module name (e.g., User Authentication, Payment Gateway)"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="text-lg p-3 border-2 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-lg font-semibold text-gray-700"
                >
                  Description
                </Label>
                {isClient && (
  <EditorWrapper
    value={formData.description || ""}
    onChange={(value) =>
      setFormData({ ...formData, description: value })
    }
  />
)}
              </div>

              {/* Module Status */}
              <div className="space-y-2">
                <Label
                  htmlFor="moduleStatus"
                  className="text-lg font-semibold text-gray-700"
                >
                  Module Status
                </Label>
                <Select
                  value={formData.status || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  required
                >
                  <SelectTrigger className="text-lg p-3 border-2 focus:border-blue-500">
                    <SelectValue placeholder="Select current status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-base"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${option.color}`}
                            />
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {formData.status && (
                  <div className="mt-2">
                    <StatusBadge status={formData.status} />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-dashboard-primary hover:bg-dashboard-primary text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Module
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/modules")}
                  className="w-full border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold py-3 text-lg transition-all duration-200"
                >
                  View All Modules
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
