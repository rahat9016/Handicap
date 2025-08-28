import { IOrganization } from "@/components/organizer/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/hooks/useGet";
import { useAppSelector } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { IResourceProps } from "../types/types";
import FileView from "./FileView";
import TableView from "./TableView";

export default function ResourceTabs(props: IResourceProps) {
  const { hasPermission } = useAppSelector((state) => state.permission)
  const { data: organizationsData } = useGet<IOrganization[]>(
    "/organizations",
    ["organizations"]
  );
  const options = mapToSelectOptions(organizationsData?.data, "name", "id");
  return (
    <Tabs defaultValue="fileView" className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <TabsList className="h-12">
          <TabsTrigger value="fileView" className="h-10">File View</TabsTrigger>
          <TabsTrigger value="tableView" className="h-10">Table View</TabsTrigger>
        </TabsList>
        {hasPermission && <Select onValueChange={(val) => props.setSelectedId(val)}>
          <SelectTrigger className="w-[200px] h-12">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            {options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>}
      </div>

      <TabsContent value="fileView">
        <FileView {...props} />
      </TabsContent>

      <TabsContent value="tableView">
        <TableView {...props} />
      </TabsContent>
    </Tabs>
  );
}
