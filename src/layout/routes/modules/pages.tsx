import type { RouteObject } from "react-router";
import { asyncModule } from "@/layout/load-modules";

const pages: RouteObject[] = [
    { path: "/profile", element: asyncModule(() => import("@/components/pages/profile")) },
    { path: "/settings", element: asyncModule(() => import("@/components/pages/settings")) },
];
export default pages;