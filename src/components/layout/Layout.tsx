import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { useSafeLoaderData } from "@/hooks/useSafeLoaderData";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { api } from "@/api";

export async function loader() {
  try {
    const data = await api.getLayoutData();
    return data;
  } catch (error) {
    console.error("Failed to load layout data for SSG", error);
    return { data: null };
  }
}

const Layout = () => {
  const loaderData = useSafeLoaderData();
  const location = useLocation(); // Current route track karne ke liye

  const headerData = {
    logo: loaderData?.data?.full,
    alt: loaderData?.data?.alt,
    primary_menu: loaderData?.data?.primary_menu,
    secondary_menu: loaderData?.data?.secondary_menu
  }

  const footerData = {
    footer_logo: loaderData?.data?.footer_logo,
    footer_menus: loaderData?.data?.footer_menus,
    copyright_text: loaderData?.data?.copyright_text,
    contact: loaderData?.data?.contact,
    social_links: loaderData?.data?.social_links,
    legal_links: loaderData?.data?.legal_links,
    footer_text: loaderData?.data?.footer_text
  }

  return (
    /* key={location.pathname} add karne se Back button press karne par 
       React ko pata chalta hai ki use child components re-sync karne hain */
    <div key={location.pathname} className="min-h-screen bg-background">
      {/* Har page change par scroll top par laane ke liye */}
      <ScrollRestoration />
      
      <Navbar data={headerData} />
      <main>
        <Outlet />
      </main>
      <Footer data={footerData} />
    </div>
  );
};

export default Layout;