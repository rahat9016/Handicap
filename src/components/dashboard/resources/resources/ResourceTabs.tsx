import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IResourceProps } from "../types/types";
import FileView from "./FileView";
import TableView from "./TableView";

export default function ResourceTabs(props: IResourceProps) {
  return (
    <Tabs defaultValue="fileView" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="fileView">File View</TabsTrigger>
        <TabsTrigger value="tableView">Table View</TabsTrigger>
      </TabsList>

      <TabsContent value="fileView">
        <FileView {...props} />
      </TabsContent>

      <TabsContent value="tableView">
        <TableView {...props} />
      </TabsContent>
    </Tabs>
  );
}