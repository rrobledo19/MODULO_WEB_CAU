'use strict' 
import axios from "axios";

export default {
    namespaced: true,

    state: {
        titulo: 'Registro de login',
        username:null,
        nombre  :null, 
        valida  :null, 
        token   : null , 
        auth :false, 
     },
   
    /* localStorage.getItem('token')*/
    actions: {

      getLogin({commit},datos_login) {
            try {
             
            let url="http://localhost:3000/usuarios/lista_login";      
            const acceso =  async()=>{
                console.log('entrando a datos login vuex',datos_login);
                try {
                    this.state.auth  =  false; 
                    this.state.auth  =  false; 
                    let valida = false; 
                    const resp =  await axios.post(url,datos_login); 

                    console.log('state valida vuex',  resp.data.accessToken); 

                    
                     if (resp.data.accessToken){
                        this.state.auth  =  true; 
                        this.state.valida  =  true; 
                    
                      localStorage.setItem('token', resp.data.token)

                      axios.defaults.headers.common['Authorization'] = resp.data.token
                      commit("SET_NOMBRE",resp.data.O_NMBRE); 
                      commit("SET_VALIDA", resp.data.accessToken); 
                      commit("SET_TOKEN",resp.data.token);
                      return {valida:true}
                   
                     
                     }else {
                        this.state.auth  =  false;   
                        this.state.valida  =  false;
                        commit("SET_NOMBRE","");  
                        commit("SET_VALIDA", resp.data.accessToken); 
                        commit("SET_TOKEN",this.state.valida)
                        return {valida:false}
                        
                     }

                    

                } catch (error) {
                    console.log("Error en el login",error); 
                    commit("SET_NOMBRE",""); 
                    commit("SET_VALIDA", resp.data.accessToken); 
                 
                }
              
             
            }
        
                const resp = acceso(); 
                 return resp;
            

            } catch (error) {
                console.log(error)
            
            }
            

        },

        obtenerToken({ commit }) {
            if (localStorage.getItem('token')) {
              commit('setToken', localStorage.getItem('token'))

           }  /*else {
              commit('setToken', null)
            }*/
          },
        
          cerrarSesion({ commit }) {
            commit('setToken', null)
            localStorage.removeItem('token')
        },

      /*  getUser({commit}, userId) { 
            axios.get('http://localhost:4000/usuarios/listadouser/' + userId).then(res => {
                console.log(res.data[0].name)
                commit('setUsername', res.data[0].name)
                commit('setEstado', 200)
            }).catch((e) => {
                console.log(e)
                commit('setUsername', null)
                commit('setEstado', 400)
            })

        }*/


    },

    mutations: {
      
    SET_TOKEN(state,token){
      state.token = token; 
    }, 

    SET_NOMBRE(state,nombre ){
        state.nombre = nombre;
        state.auth   = Boolean(nombre)
    },

    SET_VALIDA(state,valida){
        state.valida = valida; 
    }

 
    },


  /*  getters: {
        titulo: state => state.titulo,
        username: state => state.username

    }*/


}
