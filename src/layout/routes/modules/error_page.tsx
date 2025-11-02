import type { RouteObject } from "react-router";
import { asyncModule } from "@/layout/load-modules";

const errPageRouters: RouteObject[] = [
    { path: "/403", element: asyncModule(() => import("@/components/views/403")) },
    { path: "/404", element: asyncModule(() => import("@/components/views/404")) },
];
export default errPageRouters;