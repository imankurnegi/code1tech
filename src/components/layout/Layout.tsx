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
      headerLogo: null,
      navMenus: null,
      footerData: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const Layout = () => {
  const initialData = useLoaderData() as any;

  const { data } = useQuery({
    queryKey: ["layout"],
    queryFn: api.getLayoutData,
    initialData,
    staleTime: 1000 * 60 * 5,
    // In production, rely on SSG data and avoid refetch overwriting it
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
};
export default Layout;