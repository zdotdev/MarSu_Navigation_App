import { Outlet } from "react-router";
import Navbar from "~/components/custom/navigationBar/navbar";
export default function Layout() {
    return <>
        {" "}
        <Navbar />
        <Outlet />
    </>
}