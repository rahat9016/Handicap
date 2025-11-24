"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { clearOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import { getMenuItems } from "@/utils/getMenuItems";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({
  className,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    userInformation: { roleName },
  } = useAppSelector((state) => state.auth);
  const { hasPermission } = useAppSelector((state) => state.permission);

  const menuItems = getMenuItems(hasPermission, roleName);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] lg:w-[350px] bg-white border-r border-skeleton flex flex-col px-4 sm:px-[20px] py-6 transition-transform duration-300 ease-in-out z-50",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:translate-x-0 lg:static": true,
          },
          className
        )}
      >
        <div
          onClick={() => router.push("/")}
          className="flex flex-col items-center gap-3 mb-4 cursor-pointer "
        >
          {/* <Image
            width={109}
            height={48}
            src="/logo.png"
            alt="logo"
            className="w-20 h-9 sm:w-[109px] sm:h-[48px]"
          /> */}
          <div className="text-center">
            <h3 className="font-inter text-base sm:text-lg font-bold mb-1 text-[#0077CC]">
              Disability Inclusion  Resource Hub
              {/* Handicap International */}
            </h3>
            <p className="font-inter text-xs sm:text-sm font-normal text-[#4D4D4D]">
              
              {/* Disability Inclusion Resource Hub */}
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto mt-3 custom-scrollbar ">
          <Accordion
            type="multiple"
            className="flex flex-col h-full gap-1 w-full"
          >
            <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
              {menuItems.map((item) => {
                const pathnameWithoutLocale = pathname.replace(
                  /^\/(en|bn)/,
                  ""
                );
                const isActiveParent =
                  item.href && pathnameWithoutLocale === item.href;
                const isActiveChild = item.children?.some(
                  (child) => pathnameWithoutLocale === child.href
                );
                const isActive = isActiveParent || isActiveChild;

                return (
                  <AccordionItem
                    key={item.label}
                    value={item.label}
                    className="border-b-0"
                  >
                    {item.children ? (
                      <>
                        <AccordionTrigger
                          className={`px-3 sm:px-4 h-[40px] sm:h-[46px] flex items-center font-inter leading-none hover:no-underline text-sm sm:text-base ${
                            isActive
                              ? "bg-dashboard-primary text-white"
                              : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                          }`}
                        >
                          <div className="flex items-center w-full">
                            <item.icon
                              className={`flex mr-2 h-3 w-3 sm:h-4 sm:w-4 ${
                                isActive ? "text-white" : ""
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent
                          className={`flex flex-col w-full mt-1 ${
                            isActiveChild ? "block" : ""
                          }`}
                        >
                          {item.children.map((child) => {
                            const isChildActive =
                              pathnameWithoutLocale === child.href;
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`w-full h-[40px] sm:h-[46px] flex items-center gap-2 px-3 sm:px-4 text-xs sm:text-sm rounded-md font-inter pl-10 ${
                                  isChildActive
                                    ? "bg-dashboard-primary text-white"
                                    : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                                }`}
                              >
                                <span className="truncate">{child.label}</span>
                              </Link>
                            );
                          })}
                        </AccordionContent>
                      </>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        onClick={() => setIsOpen(false)}
                        className={`w-full font-medium h-[40px] sm:h-[46px] flex items-center gap-2 px-3 sm:px-4 text-xs sm:text-sm rounded-md font-inter ${
                          isActive
                            ? "bg-dashboard-primary text-white"
                            : "text-[#8C8C8C] hover:bg-[#EAF6FB] hover:text-dashboard-primary"
                        }`}
                      >
                        <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    )}
                  </AccordionItem>
                );
              })}
            </div>
          </Accordion>
        </nav>

        <div className="pb-2 mt-4">
          <Button
            onClick={() => {
              dispatch(logoutUser());
              dispatch(clearOrganization());
              dispatch(setPermission(false));
              dispatch(setAdminOrganizationPermission(false));
              setIsOpen(false);
            }}
            className="w-full bg-[#fde2e2] hover:bg-[#FDECEC] text-[#A8A8A8] hover:text-[#EB5757] flex items-center justify-start gap-2 h-10 sm:h-12 !px-3 sm:!px-4 text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4 sm:h-6 sm:w-6" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
