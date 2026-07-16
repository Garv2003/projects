import { createApp } from 'vue'
import "./scss/index.scss";
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createWebHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import Home from "./pages/Home.vue";
import Pokemon from "./pages/Pokemon.vue";
import Compare from "./pages/Compare.vue";
import Profile from "./pages/Profile.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const history = createWebHistory();
const pinia = createPinia()

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/pokemon/:id',
        name: 'pokemon',
        component: Pokemon
    },
    {
        path: '/compare',
        name: 'compare',
        component: Compare
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
];

const router = createRouter({
    history,
    routes
});

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.use(VueQueryPlugin);
app.use(ToastService);

app.mount('#app');