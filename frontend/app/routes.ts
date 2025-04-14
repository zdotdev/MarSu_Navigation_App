import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // route("about", "routes/about.tsx"),
    // route("post/:post_id", "routes/post.tsx"),
    layout("routes/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
    ]),
] satisfies RouteConfig;
