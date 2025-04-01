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
        component: FriendsView,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/gifts',
        name: 'gifts',
        component: GiftsView,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/assignment',
        name: 'assignment',
        component: AssignmentView,
        meta: {
            requiredAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach(async (to) => {
//     if (to.meta?.requiredAuth) {
//         let isAuthenticated = store.state.auth.user
//         if (!isAuthenticated) isAuthenticated = await
//             store.dispatch('auth/loginWithCredential')
//         if (!isAuthenticated)
//             return {
//                 name: 'login',
//             }
//     }
// })

export default router