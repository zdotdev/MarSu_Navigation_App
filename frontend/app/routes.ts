import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("admin/login", "routes/admin/login.tsx"),
    layout("routes/layout.tsx", [
        index("routes/dashboard.tsx"),
        route("department/:id", "routes/department.tsx"),
        route("navigation", "routes/navigation.tsx"),
        route("building-info", "routes/building-info.tsx"),
        route("admin/dashboard", "routes/admin/dashboard/admin.tsx"),
    ]),
] satisfies RouteConfig;
