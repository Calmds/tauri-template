import Layout from "@/layout";
import { RouteObject } from "react-router";
import HomePage from "@/components/pages/home";
import { asyncModule } from "@/layout/load-modules";

const metaRouters = import.meta.glob("@/layout/routes/modules/*.tsx", {
    eager: true,
    import: "default",
});

export let routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((key) => {
    routerArray = routerArray.concat(metaRouters[key] as RouteObject[]);
});

const routers: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/403", element: asyncModule(() => import("@/components/views/403")) },
            { path: "/404", element: asyncModule(() => import("@/components/views/404")) },
            { path: "/500", element: asyncModule(() => import("@/components/views/500")) },
            { path: "*", element: asyncModule(() => import("@/components/views/404")) },
            ...routerArray,
        ]
    },
    // { path: "/signin", element: <SignInUp /> },
];

export default routers;