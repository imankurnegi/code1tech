import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

export async function loader() {
  try {
    const data = await api.getLayoutData();
    console.log("SSG LAYOUT DATA:", data);

    return data;
  } catch (error) {
    console.error("Failed to load layout data for SSG", error);
    throw error;
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
    <>
      <Navbar headerLogo={loaderData?.headerLogo?.data} navMenus={loaderData?.navMenus?.data} />
      <main>
        <Outlet />
      </main>
      <Footer footerSecData={loaderData?.footerData?.data} />
    </>
  );
};
export default Layout;