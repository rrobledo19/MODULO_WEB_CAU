
<template >
  <ContentWrapper>
    
    <div class="content-heading">{{ titulo_general }}</div>
    
    <div class="col-xl-12">
  
      <div class="card-body">
<div class="p-3 bg-secondary progress-bar-striped" style="min-height: 170px;">
    <b-toast id="my-toast" :variant= variant_1 solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{msg_title}}</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
               {{msg_general}}
    </b-toast>
        <div>
          <button
            class="btn btn-labeled btn-info mb-2 mr-1 float-left"
            type="button"
            @click="limpiar_informacion(1)" 
            v-b-modal.moda_Registro
          >
            <span class="btn-label"><i class="fa fa-plus"></i></span>Registrar
          </button>
          <br />
          <br />
       </div>
<b-modal
            id="moda_Registro"
            ref="modal"
            size="lg"
            :title="titulo"
            bg-variant="info"
            hide-footer
          >
            <template class="row">
              <div class="row">
                <br />
                <!-- Codigo Impuestos -->

                <!-- Nombre usuarios -->
                <b-form-group
                  class="col-6"
                  label="Nombres:"
                  label-for="Nombres"
                >
                  <b-form-input
                   autofocus
                    id="nombre"
                    v-model="datos_usuarios.P_NOMBRES"
                    placeholder="Nombres"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                
                </b-form-group>

                      <!-- apellidos -->
                <b-form-group
                  class="col-6"
                  label="Apellidos:"
                  label-for="Apellidos"
                >
                  <b-form-input
                   autofocus
                    id="apellidos"
                    v-model="datos_usuarios.P_APELLIDOS"
                    placeholder="Apellidos"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                
                </b-form-group>

                      <!-- tipo de identificacion -->
                  <b-form-group
                  class="col-6"
                  label="Tipo Identificacion:"
                  label-for="Tipo_identificacion"
                >
                  <b-form-select
                    id="tipo_identificacion"
                    v-model="datos_usuarios.P_TIPO_IDENTIFICACION"
                    placeholder="Tipo Identificacion"
                    :options="foods"
                    required
                  ></b-form-select>
                
                </b-form-group>

            <!-- numero de identificacion -->
                <b-form-group
                  class="col-6"
                  label="Numero identificacion:"
                  label-for="Numero identificacion"
                >
                  <b-form-input
                   autofocus
                    id="identificacion"
                    v-model="datos_usuarios.P_NUMERO_ID"
                    placeholder="Identificacion"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>


                   <!-- Direccion -->
                <b-form-group
                  class="col-6"
                  label="direccion:"
                  label-for="direccion"
                >
                  <b-form-input
                   autofocus
                    id="Direccion"
                    v-model="datos_usuarios.P_DIRECCION"
                    placeholder="Direccion"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>


                  <b-form-group
                  class="col-6"
                  label="Telefono:"
                  label-for="Telefono"
                >
                  <b-form-input
                   autofocus
                    id="telefono"
                    v-model="datos_usuarios.P_TELEFONO"
                    placeholder="Telefono"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>
          
                <b-form-group
                   class="col-6"
               
                >
                        <label class="text-muted" for="signupInputPassword1">Password</label>
                        <div class="input-group with-focus">
                            <input ref="password1" :class="{'form-control border-right-0':true, 'is-invalid': errors.has('datos_usuarios.password1')}" v-model="datos_usuarios.P_PASSWORD" v-validate="'required'" type="password" name="password1" placeholder="Password"/>
                            <div class="input-group-append">
                                <span class="input-group-text text-muted bg-transparent border-left-0">
                                    <em class="fa fa-lock"></em>
                                </span>
                            </div>
                            <span v-show="errors.has('datos_usuarios.password1')" class="invalid-feedback">{{ errors.first('datos_usuarios.password1') }}</span>
                        </div>
                    </b-form-group>

              <b-form-group
                      class="col-6"
              
                    >
                       <label class="text-muted" for="signupInputRePassword1">Retype Password</label>
                        <div class="input-group with-focus">
                            <input :class="{'form-control border-right-0':true, 'is-invalid': errors.has('datos_usuarios.password2')}" v-model="datos_usuarios.P_PASSWORD_1" v-validate="'required|confirmed:password1'" type="password" name="password2" placeholder="Retype Password"/>
                            <div class="input-group-append">
                                <span class="input-group-text text-muted bg-transparent border-left-0">
                                    <em class="fa fa-lock"></em>
                                </span>
                            </div>
                            <span v-show="errors.has('datos_usuarios.password2')" class="invalid-feedback">{{ errors.first('datos_usuarios.password2') }}</span>
                        </div>
                    </b-form-group>

               <b-form-group
                  class="col-6"
                  label="Estado:"
                  label-for="Estado"
                >
                  <b-form-select
                    id="activo"
                    v-model="datos_usuarios.P_ACTIVO"
                    placeholder="Activos"
                    :options="estado"
                    required
                  ></b-form-select>
               </b-form-group>

                <!-- Usuario  -->
                <b-form-group
                  class="col-6"
                  label="Usuario:"
                  label-for="Nombres"
                >
                  <b-form-input 
                    id="nombre"
                    v-model="datos_usuarios.P_USERNAME"
                    placeholder="Nombre"
                   oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>

           
                  <div>
                    <br />
                    <b-button
                      type="submit"
                      size="sm"
                      class="float-right"
                      style="margin-left: 10px"
                      variant="danger"
                      @click="cancelar_informacion()"

                      >Cancelar</b-button
                    >

                    <div v-if="tipo_accion">
                      <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        style="margin-left: 10px"
                        @click="Registro_informacion()"
                        >Registrar</b-button
                      >
                    </div>
                    <div v-else>
                      <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        style="margin-left: 10px"
                        @click="actualizar_informacion()"
                        >Actualizar</b-button
                      >
                    </div>
                  </div>
                </b-form-group>
              </div>
            </template>
          </b-modal>
		  


       <b-table
       id="my-table"
        striped
        hover
       responsive   
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
     
           
          >
            <template #cell(Acciones)="row">
              <button
                class="btn btn-danger btn-xs mr-1 float-right"
                type="button"
                @click="eliminar_informacion(row.item)"
              >
                <i class="far fa-trash-alt"></i>
              </button>

              <button
                class="btn btn-primary btn-xs mr-1 float-right"
                type="button"
                @click="adicionar_datos(row.item)"
                v-b-modal.moda_Registro
              >
                <i class="fa fa-edit"></i>
              </button>

         
            </template>

                 <template #cell(activo)="data">
              <div v-if="data.item.activo == 'S'">
                  <b-badge pill variant="success">Activado</b-badge>
                </div>
                <div v-else>
                  <b-badge pill variant="danger">Desactivado</b-badge>
                </div>
              
            </template>
           
                
            
          
          </b-table>

      <div class="mt-3 float-right">     
   <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      aria-controls="my-table"
      pills
    ></b-pagination>
    </div>


        </div>
      </div>
    </div>
  </ContentWrapper>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import VeeValidate from "vee-validate";
import swal from "sweetalert2";
import "loaders.css/loaders.css";
import "spinkit/css/spinkit.css";

/*   Vue.use(ClientTable); */
Vue.use(VeeValidate, {
  fieldsBagName: "formFields", // fix issue with b-table
});



export default {
  components: {
    name: "Spinners",
  },
  data() {
    return {
      fields: [
        { key: "id_sgusuarios", label: "#", sortable: true },
        { key: "username", label: "Username", sortable: true },
        { key: "nombres", label: "Nombres", sortable: true },
        { key: "apellidos", label: "Apellidos", sortable: true },
        { key: "numero_id", label: "Identificacion", sortable: true },
        { key: "direccion", label: "Direccion", sortable: true },
        { key: "telefono", label: "Telefono", sortable: true },
        { key: "activo", label: "Estado", sortable: true },
        { key: "Acciones", sortable: false },
      ],
      items: [],
      nombres: "",
      titulo: "",
      tipo_accion: true,
      loading: true,
      valida_msg:true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mensage_1 :"",
      titulo_general:"Registro Información Usuarios",
      manejador:"", 
                   /* {variant: 'success', value: 75},
                    {variant: 'info', value: 75},
                    {variant: 'warning', value: 75},
                    {variant: 'danger', value: 75},
                    {variant: 'primary', value: 75},
                    {variant: 'dark', value: 75}*/

                      msg_title: null,
                      msg_general: null,
                      variant_1:'default',

      datos_usuarios: {
          P_ID_SGUSUARIOS:"", 
          P_USERNAME:"",
          P_NOMBRES:"",
          P_APELLIDOS:"",
          P_TIPO_IDENTIFICACION:"",
          P_NUMERO_ID:"",
          P_TELEFONO:"",
          P_DIRECCION:"", 
          P_COD_MUNICIPIO:"", 
          P_COD_DEPARTAMENTO:"", 
          P_ORGANISMO_TRANSITO:"", 
          P_PASSWORD:"",
          P_PASSWORD_1:"",
          P_ACTIVO:"",
          P_ACCION: ""},

          foods: [{ text: 'Select One', value: null }, { text: 'Cedula', value: 'C' },{text: 'Pasaporte', value: 'P'},{text: 'Cedula Extrajera', value: 'E'}],
          estado: [{ text: 'Select One', value: null }, { text: 'Activo', value: 'S' },{text: 'Inactivo', value: 'I'}],
      
         totalRows:"",
         perPage: 5,
         currentPage: 1,
         pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
         sortBy: '',
         sortDesc: false,
         sortDirection: 'asc',
         filter: null,
         filterOn: [],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },

  mounted() {
    this.get_usuarios();  
     },

  methods: {
   
     /* listar usuarios */
    get_usuarios(){
      let url = "http://localhost:3000/usuarios/lista_usuarios";
      const  dusuario = async () => {
        try {
          const resp = await axios.get(url);
          console.log("listando la respuesta de datos", resp.data);
          this.items = resp.data;
          console.log(resp.data); 
          this.totalRows = resp.data.length; 
        } catch (error) {
          console.log(error);
       }

        console.log("Respuestas del get", dusuario);
      };

      dusuario();
      this.$root.$emit("bv::refresh::table", "table-transition-example");
    },

    /* Registar Usuarios */
    addusuarios() {
      console.log('agregando ala tabla de ususarios',this.datos_usuarios);
        let url = "http://localhost:3000/usuarios/registro_usuario";
      this.datos_usuarios.P_ACCION = "R";
      this.titulo = "Registro Información de Usuario";
      this.tipo_accion = true;
      console.log(this.datos_usuarios);
      const v_usuarios = async () => {
        try {
          const resp = await axios.post(url, this.datos_usuarios);
          console.log('entrado a registro usuario',resp.data);
           if (!resp.data.outBinds.O_VLDA) {
            this.get_usuarios(); 
            this.msg_title   = "Notificación"
            this.msg_general = "Registrando información con exitos!!",
            this.variant_1   = "success";
           this.$bvToast.show('my-toast')
           
             
            }else{ 
      
            this.msg_title   = "Error"
            this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE,
            this.variant_1   =  "danger";
           this.$bvToast.show('my-toast')
            }
        
        } catch (error) {
          console.log('ERROR DE REGISTRO',error);
        }
        }
      
      v_usuarios();
  
      this.get_usuarios();


     }, 

    /* actualizar usuarios */
 updateusuarios() {
      let url = "http://localhost:3000/usuarios/actualizar_usuario";
      this.datos_usuarios.P_ACCION = "A";
      this.titulo = "Actualizar Información de Usuarios";
      console.log("entrando al update informacion", this.datos_usuarios);

      const v_usuarios = async () => {
        try {
          const resp = await axios.post(url, this.datos_usuarios);
          console.log("saliendo con resultado ", resp.data);
            if (!resp.data.outBinds.O_VLDA) {
            
             this.get_usuarios(); 
             this.msg_title   = "Notificación"
             this.msg_general = "Actualizando información con exitos!!",
             this.variant_1   = "success";
             this.$bvToast.show('my-toast')
             
            }else{ 

            this.msg_title   = "Error"
            this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE,
            this.variant_1   =  "danger";
            this.$bvToast.show('my-toast') 
            
            }
        } catch (error) {
          console.log("error al actualizar registro ", error);
        }
      };
      v_usuarios();
      this.get_usuarios();
    },


  
 
     /* Registro de informacion de usurios */
  Registro_informacion() {
      swal({
        title: "Esta seguro de registrar informacion?",
        text: "Registrando!",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#1e983b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar!",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.addusuarios();
          this.get_usuarios();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },

     /* actualizacion de informacion de usuarios */
actualizar_informacion() {
      swal({
        title: "Esta seguro de actualizar informacion?",
        text: "Actualizando!",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#1e983b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar!",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.updateusuarios();
          this.get_usuarios();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },

       /* adicion de elementos para la actualizacion */
     adicionar_datos(item) {
      console.log("entrando a objetos", item);
      console.log("enetrando con", item.id);
      this.datos_usuarios.P_ID_SGUSUARIOS         = item.id_sgusuarios;
      this.datos_usuarios.P_USERNAME              = item.username;
      this.datos_usuarios.P_NOMBRES               = item.nombres;
      this.datos_usuarios.P_APELLIDOS             = item.apellidos;
      this.datos_usuarios.P_TIPO_IDENTIFICACION   = item.tipo_identificacion;
      this.datos_usuarios.P_NUMERO_ID             = item.numero_id;
      this.datos_usuarios.P_TELEFONO              = item.telefono;
      this.datos_usuarios.P_DIRECCION             = item.direccion;
      this.datos_usuarios.P_COD_MUNICIPIO         = item.cod_municipio;
     /* this.datos_usuarios.P_PASSWORD              = item.password;*/
      this.datos_usuarios.P_ACTIVO                = item.activo;
      
      this.tipo_accion = false;
      this.titulo = "Actualizar Información de Usuarios";
     },
   
     /*eliminar usuarios */
    eliminarimpuesto(r_item) {
      let url = "http://localhost:3000/usuarios/eliminar_usuario";
      this.datos_usuarios.P_ACCION = ''; 
      this.datos_usuarios.P_ID_SGUSUARIOS = r_item.id_sgusuarios; 
     console.log('entrando a datos eliminado', r_item.id_sgusuarios); 
      const v_usuarios = async () => {
        try {
        const resp = await axios.post(url, this.datos_usuarios);
          console.log("repuesta de informacion eliminacion", resp.data);
            if (!resp.data.outBinds.O_VLDA) {

             this.msg_title   = "Notificación"
             this.msg_general = "Eliminado información con exitos!!",
             this.variant_1   = "success";
             this.$bvToast.show('my-toast')
             
            }else{

             this.msg_title   = "Error"
             this.msg_general = "Eliminado información con exitos!!",
             this.variant_1   = "danger";
             this.$bvToast.show('my-toast')

            }
        } catch (error) {
          console.log("error al eliminar resgitro", error);
        }
      };
      v_usuarios();
      this.get_usuarios();
    },

  eliminar_informacion(r_item) {
      swal({
        title: "Esta seguro de eliminar informacion?",
        text: "Eliminando!",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#1e983b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar!",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.eliminarimpuesto(r_item);
          this.get_usuarios();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },


       /* cancelacion de informacion de usuario */
      cancelar_informacion(){
      this.datos_usuarios.P_ID_SGUSUARIOS         = "";
      this.datos_usuarios.P_USERNAME              = "";
      this.datos_usuarios.P_NOMBRES               = "";
      this.datos_usuarios.P_APELLIDOS             = "";
      this.datos_usuarios.P_TIPO_IDENTIFICACION   = "";
      this.datos_usuarios.P_NUMERO_ID             = "";
      this.datos_usuarios.P_TELEFONO              = "";
      this.datos_usuarios.P_DIRECCION             = "";
      this.datos_usuarios.P_COD_MUNICIPIO         = "";
      this.datos_usuarios.P_PASSWORD              = "";
      this.datos_usuarios.P_ACTIVO                = "";
      this.$refs.modal.hide("moda_Registro");
    }, 

    limpiar_informacion(valor) {
      if (valor === 1 ){
      this.datos_usuarios.P_ID_SGUSUARIOS         = "";
      this.datos_usuarios.P_USERNAME              = "";
      this.datos_usuarios.P_NOMBRES               = "";
      this.datos_usuarios.P_APELLIDOS             = "";
      this.datos_usuarios.P_TIPO_IDENTIFICACION   = "";
      this.datos_usuarios.P_NUMERO_ID             = "";
      this.datos_usuarios.P_TELEFONO              = "";
      this.datos_usuarios.P_DIRECCION             = "";
      this.datos_usuarios.P_COD_MUNICIPIO         = "";
      this.datos_usuarios.P_PASSWORD              = "";
      this.datos_usuarios.P_ACTIVO                = "";
      this.datos_usuarios.P_ACCION                = "R";
     this.titulo = "Registro Información de Usuarios";
      this.tipo_accion = true;

      }
    
      
    },

   
            }
};
</script>

