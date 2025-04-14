import Theme from "~/components/custom/theme/theme";
import Menu from "~/components/custom/menu/menu";
import logo from "~/lib/assets/logo_1.png";

export default function Navbar() {
  return (
    <>
      <div className="h-16 bg-red-950 flex justify-between py-2 px-4">
        <div className="flex items-center">
          <Menu />
        </div>
        <div className="flex justify-center items-center">
          <img className="h-10 aspect-square" src={logo} alt="logo" />
        </div>
        <div className="flex items-center">
          <Theme />
        </div>
      </div>
    </>
  );
}
