import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

const Layout = () => {
    const { data } = useQuery({
        queryKey: ["layout"],
        queryFn: api.getLayoutData,
    });

    return (
        <>
            <Navbar headerLogo={data?.headerLogo?.data} navMenus={data?.navMenus?.data} />
            <main>
                <Outlet />
            </main>
            <Footer footerSecData={data?.footerData?.data} />
        </>

    );
}
export default Layout;