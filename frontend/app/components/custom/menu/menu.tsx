import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Menu as MenuIcon, Navigation, School } from "lucide-react";

export default function Menu() {
  return (
    <>
      <div className="w-fit">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon />
            </MenubarTrigger>
            <MenubarContent>
              <a
                className="flex gap-2 items-center justify-center"
                href="/navigation"
              >
                <Navigation /> Navigation
              </a>
              <a
                className="flex gap-2 items-center justify-center"
                href="/building-info"
              >
                <School />
                Campus Directory
              </a>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
