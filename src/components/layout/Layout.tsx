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

    // Deep clone primary_menu to avoid mutating React Query cache directly
    const primaryMenu = data?.data?.primary_menu ? JSON.parse(JSON.stringify(data.data.primary_menu)) : [];
    
    // Find the "Industries" menu
    const industriesMenu = primaryMenu.find((menu: any) => menu.title === "Industries");
    if (industriesMenu) {
        if (!industriesMenu.children) {
            industriesMenu.children = [];
        }
        
        // Add InsurTech if it doesn't exist
        const hasInsurTech = industriesMenu.children.some((child: any) => child.title === "InsurTech" || child.url === "/industries/insurtech");
        if (!hasInsurTech) {
            industriesMenu.children.push({
                id: 9991,
                title: "InsurTech",
                url: "/industries/insurtech",
                class: "lucide-shield",
                subtitle: "Insurance technology solutions",
                icon: "",
                children: []
            });
        }
        
        // Add Manufacturing if it doesn't exist
        const hasManufacturing = industriesMenu.children.some((child: any) => child.title === "Manufacturing" || child.url === "/industries/manufacturing");
        if (!hasManufacturing) {
            industriesMenu.children.push({
                id: 9992,
                title: "Manufacturing",
                url: "/industries/manufacturing",
                class: "lucide-factory",
                subtitle: "Smart manufacturing solutions",
                icon: "",
                children: []
            });
        }
    }

    const headerData = {
        logo: data?.data?.full,
        alt: data?.data?.alt,
        primary_menu: primaryMenu,
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