import { Plus } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import FormPopover from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav className="flex z-50 border-b  px-4 shadow-sm  bg-white  items-center h-14 w-full fixed top-0">
      {/*Mobile sidebar */}
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex ">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={16}>
          <Button className="rounded-sm   md:hidden block" variant="amber">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto gap-x-2 flex items-center">
        <FormPopover align="center" side="bottom">
          <Button
            size="sm"
            className=" py-1.5 px-2 mx-2 rounded-sm  hidden md:block h-auto "
            variant="amber"
          >
            Create
          </Button>
        </FormPopover>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
