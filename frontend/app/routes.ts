import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // route("post/:post_id", "routes/post.tsx"),
    layout("routes/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("department/:id", "routes/department.tsx"),
        route("navigation", "routes/navigation.tsx"),
        route("admin", "routes/admin/admin.tsx"),
    ]),
] satisfies RouteConfig;
