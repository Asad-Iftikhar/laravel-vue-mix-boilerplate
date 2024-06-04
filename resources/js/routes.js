import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import ErrorsNotFound from "./pages/errors/404.vue";

const routes = [
    { path: '/', component: Home, meta: { layout: "unauthenticated", unauthenticated: true }  },
    { path: '/home', component: Home, meta: { layout: "unauthenticated", unauthenticated: true }  },
    { path: '/about', component: About, meta: { layout: "unauthenticated", unauthenticated: true }  },
    { path: "/:pathMatch(.*)*", component: ErrorsNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;