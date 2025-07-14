import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  Folder,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/overview",
    },
    {
      label: "Funders",
      icon: Users,
      children: [
        { label: "Add Funder", href: "/funders/add" },
        { label: "All Funders", href: "/funders/all" },
      ],
    },
    {
      label: "Organization Manage",
      icon: Settings,
      children: [
        { label: "Add Organization", href: "/organization/add" },
        { label: "All Organizations", href: "/organization/all" },
      ],
    },
    {
      label: "Resources",
      icon: Folder,
      children: [
        { label: "Add Resources", href: "/resources/add" },
        { label: "All Resources", href: "/resources/all" },
      ],
    },
    {
      label: "Training Management",
      icon: GraduationCap,
      children: [
        { label: "Add Training", href: "/training/add" },
        { label: "All Trainings", href: "/training/all" },
      ],
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      label: "Role Management",
      icon: ShieldCheck,
      children: [
        { label: "Add Role", href: "/roles/add" },
        { label: "All Roles", href: "/roles/all" },
      ],
    },
    {
      label: "System Settings",
      icon: Settings,
      href: "/settings",
    },
  ];
  return (
    <aside className="w-72  bg-white min-h-screen border-r flex flex-col px-[22px]">
      <nav className="flex flex-col h-full">
        <Accordion type="multiple" className="w-full h-full">
          {menuItems.map((item) => (
            <AccordionItem
              key={item.label}
              value={item.label}
              className="border-b-0"
            >
              {item.children ? (
                <>
                  <AccordionTrigger className="px-4 h-[46px] hover:no-underline text-[#8C8C8C] data-[state=open]:bg-dashboard-primary data-[state=open]:text-white leading-none" >
                    <div className="flex items-center font-inter">
                      <item.icon className="mr-2 h-4 w-4  data-[state=open]:text-white flex items-center" /> {item.label}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col w-full">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="w-full text-sm h-[46px] flex items-center pl-10 hover:bg-[#EAF6FB] hover:text-dashboard-primary rounded-2xl font-inter text-[#8C8C8C]">
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </>
              ) : (
                <Link href={item.href} className="h-[46px] flex items-center gap-2 px-4 text-sm hover:bg-[#EAF6FB] hover:text-dashboard-primary rounded-2xl font-inter text-[#8C8C8C]">
                    <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        <Button variant="secondary" className="w-full justify-start mt-auto">
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
      </nav>
    </aside>
  );
}
