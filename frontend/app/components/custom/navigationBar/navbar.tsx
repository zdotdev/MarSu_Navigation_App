import Menu from "~/components/custom/menu/menu";
import logo from "~/lib/assets/logo_1.png";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { useEffect, useState } from "react";

interface NotificationData {
  notification_title: string;
  notification_details: string;
}

export default function Navbar() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:6900/api/notification");
        const data = await response.json();
        setNotifications(data.notification || []);
      } catch (error) {
        console.error("Failed to fetch notification", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <div className="h-16 bg-red-950 flex justify-between py-8 px-12">
        <div className="flex items-center">
          <Menu />
        </div>
        <div className="flex justify-center items-center">
          <a href="/">
            <img className="h-10 aspect-square" src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative">
                <Bell className="text-white" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col">
                {notifications.map((notif) => (
                  <div
                    key={notif.notification_title}
                    className="flex flex-col w-90 mb-3 p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50"
                  >
                    <p className="font-semibold text-gray-800 mb-1">
                      {notif.notification_title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {notif.notification_details}
                    </p>
                  </div>
                ))}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
