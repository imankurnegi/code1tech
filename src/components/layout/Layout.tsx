import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

const Layout = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["layout"],
        queryFn: api.getLayoutData,
    });

    if (isLoading) return null;
    if (error) return null;

    const headerData = {
        logo: data?.data?.full,
        alt: data?.data?.alt,
        primary_menu: data?.data?.primary_menu,
        secondary_menu: data?.data?.secondary_menu
    }
    const footerData = {
        footer_logo: data?.data?.footer_logo,
        footer_menus: data?.data?.footer_menus,
        copyright_text: data?.data?.copyright_text,
        contact: data?.data?.contact,
        social_links: data?.data?.social_links,
        legal_links: data?.data?.legal_links,
        footer_text: data?.data?.footer_text
    }

    return (
        <>
            <Navbar data={headerData} />
            <main>
                <Outlet />
            </main>
            <Footer data={footerData} />
        </>

    );
}
export default Layout;