import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import CallbackUrl from "./views/CallbackView.vue";
// lazy-loaded
const Profile = () => import("./views/./ProfileView")
const AdminBoard = () => import("./components/boards/./AdminBoard")
const ModeratorBoard = () => import("./components/boards/./ModeratorBoard")
const UserBoard = () => import("./components/boards/./UserBoard")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/callback",
    component: CallbackUrl,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: AdminBoard,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: ModeratorBoard,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: UserBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;