import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useQuery } from "@tanstack/react-query";

const Layout = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["layout"],
        queryFn: async () => {
            const [headerRes, navRes] = await Promise.all([
                fetch("https://code1tech.page.gd/wp-json/theme/v1/header-logo", {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                    },
                }),
                fetch(`${import.meta.env.VITE_BASE_URL}/menus/topmenu`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                    },
                }),
            ]);

            if (!headerRes.ok || !navRes.ok) {
                throw new Error("Failed to fetch data");
            }

            return {
                headerLogo: await headerRes.json(),
                navMenus: await navRes.json(),
            };

        },
    });
    // if (isLoading) return <div>Loading layout...</div>;
    // if (isError) return <div>{error.message}</div>;

    return (
        <>
            <Navbar headerLogo={data?.headerLogo?.data} navMenus={data?.navMenus?.data} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>

    );
}
export default Layout;