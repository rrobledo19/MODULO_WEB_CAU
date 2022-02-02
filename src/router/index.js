import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Layouts
import Layout from '@/components/Layout/Layout'

import LayoutHorizontal from '@/components/Layout/LayoutHorizontal'
import LayoutPage from '@/components/Layout/LayoutPage'
// SingleView
const SingleView = () => import ('@/views/SingleView/SingleView.vue')
// SubMenu
const SubMenu = () => import ('@/views/SubMenu/SubMenu.vue')
//parametrizacion 
const  impuestos        = () => import('@/views/parametrizacion/impuestos.vue')
const  medidas          = () => import('@/views/parametrizacion/tipo_medidas.vue')
const  cautelar_entidad = () => import('@/views/parametrizacion/cautelar_entidad.vue')
const  tipo_proceso     = () => import('@/views/parametrizacion/tipo_proceso.vue')
const  tipo_plantilla   = () => import('@/views/parametrizacion/tipo_plantilla.vue')
const  Login            = () => import('@/views/Pages/Login.vue')

Vue.use(VueRouter)

const routes =  [{
    path: '/',
    redirect: '/login'
},
{
    component: Login,
    path: '/login',
    name: 'Login',
 

},
// Admin Pages
{
    path: '/',
    component: Layout,
    children: [
        {
            path: '/singleview',
            component: SingleView
        }, {
            path: '/submenu',
            component: SubMenu
        },
      
        {
            component: impuestos,
            path: '/impuestos',
            meta: {requireAuth: true}
        },
        {
            component: medidas,
            path: '/medidas',
            meta: {requireAuth: true}
        },
        {
            component:cautelar_entidad ,
            path: '/cautelar_entidad',
            meta: {requireAuth: true}
        },
        {
            component:tipo_proceso ,
            path: '/tipo_proceso',
            meta: {requireAuth: true}
        },
        {
            component:tipo_plantilla ,
            path: '/tipo_plantilla',
            meta: {requireAuth: true}
        },
    ]
},
// Not found route
{
    path: '*',
    redirect: '/'
}
]

const router = new VueRouter({ 
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
}); 




router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
    console.log('ruta protegida',rutaProtegida); 
    console.log('usuario',store.state.users.token); 
  /* && store.state.token === null*/
  /*&& store.state.users.token === null*/
      if(rutaProtegida && (!store.state.users.token)){
          // ruta protegida es true
          // token es nulo true, por ende redirigimos al inicio
          next({name: 'Login'})
      }else{
          // En caso contrario sigue...
          next()
      }
  
  })




  
export default router