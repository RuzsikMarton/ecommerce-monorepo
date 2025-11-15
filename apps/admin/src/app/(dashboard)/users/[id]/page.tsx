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
import { auth, User } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

const getData = async (
  id: string
): Promise<{ data: User | null; error?: string }> => {
  const { getToken } = await auth();
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return {
        data: null,
        error: `Failed to fetch users: ${res.status} ${res.statusText}`,
      };
    }
    const response = await res.json();

    return {
      data: response || null,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

const SingleUserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getData(id);

  if (!data) {
    return (
      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-semibold">User not found or error occurred</p>
        {error && <p className="text-sm text-gray-500">{error}</p>}
      </div>
    );
  }

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
            <BreadcrumbPage>{id}</BreadcrumbPage>
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
              {!data.banned && (
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
              )}

              {String(data.publicMetadata?.role) === "admin" && (
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
                      Admin users have access to all features and can manage
                      users
                    </p>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </div>
          {/* User Card */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center">
              <Avatar className="size-12">
                <AvatarImage src={data.imageUrl} />
                <AvatarFallback>
                  {data.firstName?.charAt(0) || data.username?.charAt(0) || "-"}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold ml-2">
                {data.firstName + " " + data.lastName || data.username || "-"}
              </h1>
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
                <EditUser user={data}/>
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
                <span>
                  {data.firstName + " " + data.lastName || data.username || "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>{data.emailAddresses[0]?.emailAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>{data.phoneNumbers[0]?.phoneNumber || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Role:</span>
                <span>{String(data.publicMetadata?.role) || "user"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Status:</span>
                <span
                  className={cn(
                    `p-1 rounded-md w-max text-xs`,
                    !data.banned && "bg-green-500/40",
                    data.banned && "bg-red-500/40"
                  )}
                >
                  {data.banned ? "inactive" : "active"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Joined on {new Date(data.createdAt).toLocaleDateString("en-Us")}
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
