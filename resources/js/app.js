/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import 'bootstrap';
import { createApp } from 'vue';
import router from "./routes.js";
import { store } from './store/index.js'
import ExampleComponent from './components/ExampleComponent.vue';
import LayoutWrapper from "./layouts/LayoutWrapper.vue";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout.vue";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.vue";
import HeaderComponent from "./layouts/Header.vue";
import SidebarComponent from "./layouts/Sidebar.vue";
import BreadcrumbComponent from "./layouts/Breadcrumb.vue";
import FooterComponent from "./layouts/Footer.vue";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

// Create Vue App
const app = createApp({});

app.use(router);
app.use(store)


// Layouts
app.component("LayoutsWrapper", LayoutWrapper);
app.component("LayoutsUnauthenticated", UnauthenticatedLayout);
app.component("LayoutsAuthenticated", AuthenticatedLayout);
app.component("HeaderSection", HeaderComponent);
app.component("SidebarSection", SidebarComponent);
app.component("BreadcrumbSection", BreadcrumbComponent);
app.component("FooterSection", FooterComponent);
// Here we add authenticated and non authenticated components
app.component('ExampleComponent', ExampleComponent);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.mount('#app');
