import {createWebHistory, createRouter} from 'vue-router'
import HomeView from "../views/HomeView.vue";
import FriendsView from "../views/FriendsView.vue";
import GiftsView from "../views/GiftsView.vue";
import AssignmentView from "../views/AssignmentView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView},
    {
        path: '/friends',
        name: 'friends',
        component: FriendsView
    },
    {
        path: '/gifts',
        name: 'gifts',
        component: GiftsView
    },
    {
        path: '/assignment',
        name: 'assignment',
        component: AssignmentView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router