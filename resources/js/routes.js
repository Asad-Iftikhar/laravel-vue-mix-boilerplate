import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import About from './pages/About.vue';
import Dashboard from './pages/Dashboard.vue';
import UsersList from './pages/users/UsersList.vue';
import UserDetails from './pages/users/UserDetails.vue';
import UserPermissions from './pages/users/UserPermissions.vue';
import UserRoles from './pages/users/UserRoles.vue';
import ErrorsNotFound from "./pages/errors/404.vue";
import {userService} from './services/index.js';
import {store} from "./store/index.js";

const routes = [
    {path: '/', component: Dashboard, meta: {layout: "authenticated"}},
    {path: '/dashboard', component: Dashboard, meta: {layout: "authenticated", breadcrumb: 'Dashboard'}},
    {
        path: '/users',
        component: UsersList,
        meta: {layout: "authenticated", breadcrumb: 'Users'},
        children: [
            {
                path: ':id',
                component: UserDetails,
                meta: {layout: "authenticated", breadcrumb: (route) => `User ${route.params.id}`}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'new',
                component: UserDetails,
                meta: {layout: "authenticated", breadcrumb: 'New'}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'roles',
                component: UserRoles,
                meta: {layout: "authenticated", breadcrumb: 'Roles'}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'permissions',
                component: UserPermissions,
                meta: {layout: "authenticated", breadcrumb: 'Permissions'}, // Dynamic breadcrumb based on route parameter
            },
        ],
    },
    {path: '/about', component: About, meta: {layout: "authenticated", breadcrumb: 'About Us'}},
    {path: '/home', component: Home, meta: {layout: "unauthenticated", noAuth: true}},
    {
        path: '/login', component: Login, meta: {layout: "unauthenticated", noAuth: true},
        beforeEnter: (to, from, next) => {
            const isAuthenticated = store.getters['authentication/authenticatedUser'] !== null;
            if (isAuthenticated) {
                next('/dashboard'); // Redirect to dashboard if authenticated
            } else {
                next(); // Continue with navigation to login (default behavior)
            }
        }
    },
    // {path: '/about', component: About, meta: {layout: "unauthenticated", noAuth: true}},
    {path: "/:pathMatch(.*)*", component: ErrorsNotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (to.meta.noAuth !== true) {
        if (store.getters['authentication/authenticatedUser'] === null) {
            userService.CheckLoggedIn().then((user) => {
                store.dispatch('authentication/authenticated', user)
            }).then(() => {
                if (to.path == '/login') {
                    next('/dashboard');
                }
                next();
            }).catch((_error) => {
                next('/login');
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;