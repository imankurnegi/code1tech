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
      headerLogo: { data: null },
      navMenus: { data: [] },
      footerData: { data: {} },
    };
  }
}

const Layout = () => {
  const loaderData = useLoaderData() as any;

  // const { data } = useQuery({
  //   queryKey: ["layout"],
  //   queryFn: api.getLayoutData,
  //   initialData: loaderData,
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  // });

  return (
    <div className="min-h-screen bg-background">
      <Navbar headerLogo={loaderData?.headerLogo?.data} navMenus={loaderData?.navMenus?.data} />
      <main>
        <Outlet />
      </main>
      <Footer footerSecData={loaderData?.footerData?.data} />
    </div>
  );
};
export default Layout;