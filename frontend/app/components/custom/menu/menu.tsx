import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Menu as MenuIcon } from "lucide-react";

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
              <a className="flex justify-center" href="/sample">
                Navigation
              </a>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
