import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Menu as MenuIcon,
  Navigation,
  School,
  MessageCircleQuestion,
} from "lucide-react";

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
              <div className="flex flex-col justify-start gap-2 p-2">
                <a className="flex gap-2 items-center" href="/navigation">
                  <Navigation /> Navigation
                </a>
                <a className="flex gap-2 items-center" href="/building-info">
                  <School />
                  Campus Directory
                </a>
                <Dialog>
                  <DialogTrigger className="cursor-pointer flex items-center gap-2">
                    <MessageCircleQuestion />
                    Contact Us?
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Us</DialogTitle>
                      <DialogDescription className="space-y-4 p-4">
                        <p className="text-lg font-medium">
                          We're here to help! Whether you have a question,
                          feedback, or just want to say hello, we'd love to hear
                          from you.
                        </p>

                        <div className="space-y-2">
                          <h3 className="text-md font-semibold text-red-950">
                            Customer Support
                          </h3>
                          <p className="text-sm">
                            For any inquiries related to orders, services, or
                            general questions, feel free to reach out to us:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Xian Eheins Guevara</p>
                              <p>Email: xianeheinsguevara@gmail.com</p>
                              <p>Contact: 09560550775</p>
                            </div>
                            <div>
                              <p className="font-medium">
                                Ana Samantha Pielago
                              </p>
                              <p>Email: anasamanthapielago@gmail.com</p>
                              <p>Contact: 09083892915</p>
                            </div>
                            <div>
                              <p className="font-medium">Dirk Cristian Miras</p>
                              <p>Email: dirkcristianmiras@gmail.com</p>
                              <p>Contact: 09560550775</p>
                            </div>
                            <div>
                              <p className="font-medium">
                                Princess Reanne Fidelino
                              </p>
                              <p>Email: princessreannefidelino@gmail.con</p>
                              <p>Contact: 09502763947</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">
                              Project Management Office:
                            </span>{" "}
                            Ar. Maynard M. Muhi
                          </p>
                          <p>
                            <span className="font-medium">Facebook:</span>{" "}
                            <a
                              href="https://www.facebook.com/share/1Bb33qcMmu/?mibextid=wwXIfr"
                              className="text-blue-600 hover:underline"
                            >
                              Visit our Facebook page
                            </a>
                          </p>
                          <p>
                            <span className="font-medium">Hours:</span> Monday –
                            Friday | 8:00 AM – 5:00 PM (Local Time)
                          </p>
                          <p>
                            <span className="font-medium">Location:</span> Drax
                            Campus Solution, Tanza, Boac, Marinduque 4900
                          </p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
