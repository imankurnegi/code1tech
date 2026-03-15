import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

export async function loader() {
  try {
    const data = await api.getLayoutData();
    return data;
  } catch (error) {
    console.error("Failed to load layout data for SSG", error);
    return {
      data: null
    };
  }
}
const Layout = () => {
  const loaderData = useLoaderData() as any;

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
    <div className="min-h-screen bg-background">
      <Navbar data={headerData} />
      <main>
        <Outlet />
      </main>
      <Footer data={footerData} />
    </div>
  );
};
export default Layout;