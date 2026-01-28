import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

export async function loader() {
  const data = await api.getLayoutData();
  return data;
}

const Layout = () => {
    const initialData = useLoaderData() as any;

    const { data } = useQuery({
        queryKey: ["layout"],
        queryFn: api.getLayoutData,
        initialData: initialData,
        staleTime: 1000 * 60 * 5
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