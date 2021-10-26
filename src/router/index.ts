import { createRouter, createWebHashHistory, Router } from "vue-router";
import Layout from "@/layout/index.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
      {
        path: "/",
        redirect: '/register/process'
      }, {
        path: "/register",
        name: "register",
        component: Layout,
        meta: {
        title: "message.hsregister",
        showLink: false,
        rank: 102
        },
        
        children: [{
            path: "process",
            name: "process",
            component: () => import("@/views/process/index.vue")
        }]
    }],
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}


// const whiteList = ["/login", "/register"];

router.beforeEach((to, _from, next) => {
 
  next();
});

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
