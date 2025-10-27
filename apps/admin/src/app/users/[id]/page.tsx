import EditUser from "@/components/EditUser";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Shield } from "lucide-react";
import AppLineChart from "@/components/AppLineChart";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SingleUserPage = () => {
  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Martin Ruzsik</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Page content goes here */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* Badges */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">User Badges</h1>
            <div className="flex gap-4 mt-4">
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="text-blue-500/30 border rounded-full border-blue-500/50 p-1"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2">Verified User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been verified by the admin
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className="text-green-800/30 border rounded-full border-green-800/50 p-1"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2">Admin</h1>
                  <p className="text-sm text-muted-foreground">
                    Admin users have access to all features and can mange users
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          {/* User Card */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center">
              <Avatar className="size-12">
                <AvatarImage src="https://avatars.githubusercontent.com/u/116498941" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold ml-2">Martin Ruzsik</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This is the space for some description about the user.
            </p>
          </div>
          {/* User Info */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm">Edit User</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-xs text-muted-foreground">
                  Profile completion
                </p>
                <Progress value={70} className="rounded-lg" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Full name:</span>
                <span>Martin Ruzsik</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>example@mail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>+1 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Address:</span>
                <span>123 Main st.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">City:</span>
                <span>New York</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Joined on 2025.01.01
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full xl:w-2/3 space-y-6">
          {/* Chart */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
