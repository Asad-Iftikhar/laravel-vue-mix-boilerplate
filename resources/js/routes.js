import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Logout from './pages/Logout.vue';
import About from './pages/About.vue';
import Dashboard from './pages/Dashboard.vue';
import UsersIndex from './pages/users/Index.vue';
import UsersList from './pages/users/UsersList.vue';
import UserDetails from './pages/users/UserDetails.vue';
import UserPermissions from './pages/users/UserPermissions.vue';
import UserRoles from './pages/users/UserRoles.vue';
import ErrorsNotFound from "./pages/errors/404.vue";
import {authService} from './services/index.js';
import {store} from "./store/index.js";

const routes = [
    {path: '/', component: Dashboard, meta: {layout: "authenticated"}},
    {path: '/dashboard', component: Dashboard, meta: {layout: "authenticated", breadcrumb: 'Dashboard'}},
    {
        path: '/users',
        component: UsersIndex,
        meta: {breadcrumb: 'Users'},
        children: [
            {
                path: '',
                component: UsersList,
                meta: {breadcrumb: 'List'}, // Dynamic breadcrumb based on route parameter
            },{
                path: ':id',
                component: UserDetails,
                meta: {breadcrumb: (route) => `User ${route.params.id}`}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'new',
                component: UserDetails,
                meta: {breadcrumb: 'New'}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'roles',
                component: UserRoles,
                meta: {breadcrumb: 'Roles'}, // Dynamic breadcrumb based on route parameter
            }, {
                path: 'permissions',
                component: UserPermissions,
                meta: {breadcrumb: 'Permissions'}, // Dynamic breadcrumb based on route parameter
            },
        ],
    },
    {path: '/about', component: About, meta: {breadcrumb: 'About Us'}},
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
    {
        path: '/logout', component: Logout,
        beforeEnter: (to, from, next) => {
            store.dispatch('authentication/logout');
        }
    },
    // {path: '/about', component: About, meta: {layout: "unauthenticated", noAuth: true}},
    {path: "/:pathMatch(.*)*", component: ErrorsNotFound, meta: {noAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (to.meta.noAuth !== true) {
        if (store.getters['authentication/authenticatedUser'] === null) {
            authService.CheckLoggedIn().then((user) => {
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