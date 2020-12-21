import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home";
import Converter from "../components/Converter";
import Send from "../components/Send";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/converter",
        component: Converter,
    },
    {
        path: "/send",
        component: Send,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
