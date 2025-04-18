import Menu from "~/components/custom/menu/menu";
import logo from "~/lib/assets/logo_1.png";
import { Bell } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { useEffect, useState } from "react";

interface NotificationData{
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
      <div className="h-16 bg-red-950 flex justify-between py-2 px-4">
        <div className="flex items-center">
          <Menu />
        </div>
        <div className="flex justify-center items-center">
          <a href="/dashboard">
            <img className="h-10 aspect-square" src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex items-center">
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
              <Bell className="text-white" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
                </span>
              )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              {notifications.map((notif) => (
                <div key={notif.notification_title} className="mb-3 p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50">
                  <p className="font-semibold text-gray-800 mb-1">{notif.notification_title}</p>
                  <p className="text-sm text-gray-600">{notif.notification_details}</p>
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </>
  );
}
