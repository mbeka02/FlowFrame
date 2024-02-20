"use client";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type SidebarProps = {
  storageKey?: string;
};
type Organization = {
  name: string;
  slug: string;
  imageUrl: string;
  id: string;
};
const Sidebar = ({ storageKey }: SidebarProps) => {
  storageKey = "t-sidebar-state";
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  //Read Clerk docs on organizations for more info
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  //reduce object to  an array of active ids
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      //if curr key is expanded push it to the array
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  //on expansion toggle state of  curr. item  and add it to the  list
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  //loading ui
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="w-10 h-10 " />
        </div>
        <div className="space-y-16">
          {[...Array(3)].map((_, i) => (
            <NavItem.Skeleton key={i} />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex font-medium text-xs  mb-1 rounded-md">
        <span className="pl-4 mt-3"> Workspaces</span>
        <Button
          size="icon"
          type="button"
          asChild
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className=" h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => {
          return (
            <NavItem
              key={organization.id}
              name={organization.name}
              isActive={
                activeOrganization?.id === organization.id ? true : false
              }
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          );
        })}
      </Accordion>
    </>
  );
};

const NavItem = ({
  name,
  isActive,
  isExpanded,
  organization,
  onExpand,
}: {
  name: string;
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4  mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4  mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4  mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4  mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];
  const handleClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center p-1.5 rounded-md  gap-x-2 text-neutral-700 hover:bg-amber-600/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-amber-600 text-primary-foreground"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative w-7 h-7">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-neutral-700 pt-1">
        {routes.map((route) => {
          return (
            <Button
              key={route.href}
              size="sm"
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href &&
                  "bg-amber-600 text-primary-foreground"
              )}
              onClick={() => handleClick(route.href)}
              variant="ghost"
            >
              {route.icon}
              {route.label}
            </Button>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
//;oading skeleton for nav item components
NavItem.Skeleton = function SkeletonItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default Sidebar;
