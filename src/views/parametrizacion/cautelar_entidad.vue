
<template >
  <ContentWrapper>
    <div class="content-heading">{{ titulo_general }}</div>

    <div class="col-xl-12">
      <div
        class="p-3 bg-secondary progress-bar-striped"
        style="min-height: 170px"
      >
        <b-toast id="my-toast" :variant="variant_1" solid>
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
              <b-img
                blank
                blank-color="#ff5555"
                class="mr-2"
                width="12"
                height="12"
              ></b-img>
              <strong class="mr-auto">{{ msg_title }}</strong>
              <small class="text-muted mr-2">42 seconds ago</small>
            </div>
          </template>
          {{ msg_general }}
        </b-toast>

        <div class="card-body">
          <div>
            <button
              class="btn btn-labeled btn-info mb-2 mr-1 float-left"
              type="button"
              @click="limpiar_informacion(1)"
              v-b-modal.moda_Registro
            >
              <span class="btn-label"><i class="fa fa-plus"></i></span>Registrar
            </button>
              <b-form-group
            label="Buscar"
            label-cols-sm="6"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0 float-rigth"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Texto a buscar"
              ></b-form-input>
              <b-input-group-append>
               
              </b-input-group-append>
            </b-input-group>
          </b-form-group>


            <br />
            <br />
          </div>
          
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
            <template #cell(estdo_entdad)="row">
              <div v-if="row.item.estdo_entdad == 'S'">
                <b-badge pill variant="success">Activado</b-badge>
              </div>
              <div v-else>
                <b-badge pill variant="danger">Desactivado</b-badge>
              </div>
            </template>

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

                <!-- Codigo de entidad  -->
                <b-form-group
                  class="col-6"
                  label="Codigo:"
                  label-for="Codigo entidad"
                >
                  <b-form-input
                    autofocus
                    id="P_CDGO_ENTDAD"
                    v-model="datos_entidad.P_CDGO_ENTDAD"
                    placeholder="Codigo entidad"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Nombre entidad  -->
                <b-form-group
                  class="col-6"
                  label="Descripción:"
                  label-for="Nombre entidad"
                >
                  <b-form-input
                    id="P_NMBRE_ENTDAD"
                    v-model="datos_entidad.P_NMBRE_ENTDAD"
                    placeholder="Nombre entidad"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Direccion entidad  -->
                <b-form-group
                  class="col-6"
                  label="Direccion:"
                  label-for="Direccion"
                >
                  <b-form-input
                    id="P_DRCCION_ENTDAD"
                    v-model="datos_entidad.P_DRCCION_ENTDAD"
                    placeholder="Direccion"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="col-6"
                  label="Contacto:"
                  label-for="Contacto"
                >
                  <b-form-input
                    id="P_CDGO_CNTCTO"
                    v-model="datos_entidad.P_CDGO_CNTCTO"
                    placeholder="Contacto"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                  <b-form-group
                  class="col-6"
                  label="Contacto:"
                  label-for="Contacto"
                >
                  <b-form-input
                    id="P_CNTCTO_ENTDAD"
                    v-model="datos_entidad.P_CNTCTO_ENTDAD"
                    placeholder="Contacto"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Tipo Medida  -->
                <b-form-group
                  class="col-6"
                  label="Tipo Media:"
                  label-for="Tipo Media"
                >
                  <b-form-select
                    id="P_TPO_MDDA"
                    v-model="datos_entidad.P_TPO_MDDA"
                    placeholder="Municipio"
                    :options="tipo_medida"
                  ></b-form-select>
                </b-form-group>

          

                <!-- Departamento  -->
                <b-form-group
                  class="col-6"
                  label="Departamento:"
                  label-for="Departamento"
                >
                  <b-form-select
                    id="P_CDGO_DPRTMNTO"
                    v-model="datos_entidad.P_CDGO_DPRTMNTO"
                    placeholder="Departamento"
                    :options="departamento"
                    @change="get_municipio()"
                  ></b-form-select>
                </b-form-group>

                <!-- Municipio  -->
                <b-form-group
                  class="col-6"
                  label="Municipio:"
                  label-for="Municipio"
                >
                  <b-form-select
                    id="P_CDGO_MNCPIO"
                    v-model="datos_entidad.P_CDGO_MNCPIO"
                    placeholder="Municipio"
                    :options="municipio"
                  ></b-form-select>
                </b-form-group>

                      <!-- Nit entidad  -->
                <b-form-group class="col-6" label="Nit:" label-for="Nit">
                  <b-form-input
                    id="P_NIT"
                    v-model="datos_entidad.P_NIT"
                    placeholder="Nit"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Estado de entidad  -->
                <b-form-group class="col-6" label="Estado:" label-for="Estado">
                  <b-form-select
                    id="P_ESTDO"
                    v-model="datos_entidad.P_ESTDO_ENTDAD"
                    placeholder="Estado"
                    :options="estado"
                    required
                  ></b-form-select>

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
        /* { key: "id_entddes", label: "#", sortable: true },*/
        { key: "cdgo_entdad", label: "Codigo Entidad", sortable: true },
        { key: "nmbre_entdad", label: "Nombre", sortable: true },
        { key: "drccion_entdad", label: "Direccion", sortable: true },
        /* { key: "cdgo_cntcto", label: "Contacto", sortable: true },*/
        { key: "cntcto_entdad", label: "Contacto", sortable: true },
        /*  { key: "tpo_mdda", label: "Tipo Medida", sortable: true },*/
        { key: "desc_medida", label: "Tipo Medida", sortable: true },
        /*{ key: "cdgo_dprtmnto", label: "Departamento", sortable: true },*/
        { key: "dpto_dscrpcion", label: "Departamento", sortable: true },
        /*{ key: "cdgo_mncpio", label: "Municipio", sortable: true },*/
        { key: "munc_dscrpcion", label: "Municipio", sortable: true },
        { key: "nit", label: "Nit", sortable: true },
        { key: "estdo_entdad", label: "Estado", sortable: true },
        { key: "Acciones", sortable: false },
      ],
      items: [],
      departamento: [],
      municipio: [],
      tipo_medida: [],
      nombres: "",
      titulo: "",
      tipo_accion: true,
      loading: true,
      valida_msg: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mensage_1: "",
      titulo_general: "Registro Cautelar Entidad",
      estado: [
        { text: "Select One", value: null },
        { text: "Activo", value: "S" },
        { text: "Inactivo", value: "N" },
      ],
      manejador: "",
      /* {variant: 'success', value: 75},
                    {variant: 'info', value: 75},
                    {variant: 'warning', value: 75},
                    {variant: 'danger', value: 75},
                    {variant: 'primary', value: 75},
                    {variant: 'dark', value: 75}*/

      msg_title: null,
      msg_general: null,
      variant_1: "default",

      notifDuration: 5000,
      notifTitle: "Notification Title",
      notifMessage: "Notification Message",
      notifPosition: "center top",
      notifVariant: "default",

      datos_entidad: {

       
        P_ID_ENTDDES: "",
        P_NMBRE_ENTDAD: "",
        P_CDGO_ENTDAD: "",
        P_DRCCION_ENTDAD: "",
        P_CDGO_CNTCTO: "",
        P_CNTCTO_ENTDAD: "",
        P_TPO_MDDA: "",
        P_CDGO_DPRTMNTO: "",
        P_CDGO_MNCPIO: "",
        P_NIT: "",
        P_ESTDO_ENTDAD: "",
        P_ACCION: "",
      },

      totalRows: "",
      perPage: 10,
      currentPage: 1,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
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
    this.get_entidades();
    this.get_departamento();
    this.get_municipio();
    this.get_tipo_medida();
  },

  methods: {
    get_entidades() {
      let url = "http://localhost:3000/entidad_cautelar/lista_entidades";
      const v_entidades = async () => {
        try {
          const resp = await axios.get(url);
          console.log("listando la respuesta de datos", resp.data);
          this.items = resp.data;
          this.totalRows = resp.data.length;
        } catch (error) {
          console.log(error);
        }

        console.log("Respuestas del get", v_entidades);
      };

      v_entidades();
      this.$root.$emit("bv::refresh::table", "table-transition-example");
    },

    get_departamento() {
      let url = "http://localhost:3000/departamento/lista_departamento";

      const v_departamento = async () => {
        try {
          const resp = await axios.get(url);

          resp.data.map((depto) => {
            /*  console.log('datos proceso',depto.id_dprtmnto); */

            let depa = {
              id_dprtmnto: depto.id_dprtmnto,
              cdgo_dprtmnto: depto.cdgo_dprtmnto,
              dscrpcion: depto.dscrpcion,
            };

            this.departamento.push({
              value: depa.id_dprtmnto,
              text: depa.dscrpcion,
            });
          });
        } catch (error) {
          console.log("error en departamentos", error);
        }
      };
      v_departamento();
    },

    get_municipio() {
      let url = "http://localhost:3000/municipio/lista_municipio";
       this.municipio = [];

      const v_municipio = async () => {
        try {
          const resp = await axios.post(url, this.datos_entidad);
          console.log("datos municipios", resp.data.rows.length);
          if (resp.data.rows.length === 0) {
            this.municipio = [];
          }

          resp.data.rows.map((munc) => {
            /*   console.log('datos municipios',munc[0])*/
            let muni = {
              ID_MNCPIO: munc[0],
              CDGO_DPRTMNTO: munc[1],
              CDGO_MNCPIO: munc[2],
              DSCRPCION: munc[3],
            };

            this.municipio.push({
              value: muni.ID_MNCPIO,
              text: muni.DSCRPCION,
            });
          });
        } catch (error) {
          console.log("error al obtener el municipio", error);
        }
      };
      v_municipio();
    },

    get_tipo_medida() {
      let url = "http://localhost:3000/medidas/lista_tipo_medidas";

      const v_tipomedida = async () => {
        try {
          const resp = await axios.get(url);
          resp.data.map((datos_medida) => {
            let medida = {
              id_tpo_mdda: datos_medida.id_tpo_mdda,
              dscrpcion: datos_medida.dscrpcion,
            };
            this.tipo_medida.push({
              value: medida.id_tpo_mdda,
              text:  medida.dscrpcion,
            });
          });
        } catch (error) {
          console.log("error en la lista de tipo de medida", error);
        }
      };

      v_tipomedida();
    },

    addcautelar(){
     let url = 'http://localhost:3000/entidad_cautelar/registro_entidades';
      this.datos_entidad.P_ACCION = "R";
      this.titulo = "Registro Información de Impuestos.";
      this.tipo_accion = true;
      console.log(this.datos_entidad);
      const cautelar = async () => {
        try {
          const resp = await axios.post(url, this.datos_entidad);
          console.log('entrado a registro impuesto',resp.data);
           if (!resp.data.outBinds.O_VLDA) {
            this.get_entidades(); 
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
      cautelar();
  
      this.get_entidades();

     
    }, 

    updatecautelar(){
     let url = 'http://localhost:3000/entidad_cautelar/actualizar_entidades';
      this.datos_entidad.P_ACCION = "A";
      this.titulo = "Actalizar Información de Impuestos";
      this.tipo_accion = true;
      console.log(this.datos_entidad);
      const cautelar = async () => {
        try {
          const resp = await axios.post(url, this.datos_entidad);
          console.log('entrado a registro impuesto',resp.data);
           if (!resp.data.outBinds.O_VLDA) {
            this.get_entidades(); 
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
          console.log('ERROR DE REGISTRO',error);
        }
        
       }
      cautelar();
  
      this.get_entidades();

     
    }, 
    
       /*eliminar registro de impuestos */
    eliminarcautelar(r_item) {
      let url = "http://localhost:3000/entidad_cautelar/eliminar_entidades";
      this.datos_entidad.P_ACCION = "";
       this.datos_entidad.P_ID_ENTDDES = r_item.id_entddes;
     console.log('entrando a datos eliminado', r_item.id_entddes); 
      const cautelar = async () => {
        try {
        const resp = await axios.post(url, this.datos_entidad);
          console.log("repuesta de informacion eliminacion", resp.data);
            if (!resp.data.outBinds.O_VLDA) {
            this.get_entidades();
            this.msg_title   = "Notificación"
            this.msg_general = "Eliminado  información con exitos!!",
            this.variant_1   = "success";
            this.$bvToast.show('my-toast')

            }else{ 
             this.showAlert();
            this.msg_title   = "Error"
            this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE,
            this.variant_1   = "danger";
            this.$bvToast.show('my-toast')
  
            }
        } catch (error) {
          console.log("error al eliminar resgitro", error);
        }
      };
      cautelar();
      this.get_entidades();
    },

    limpiar_informacion(valor) {
      if (valor === 1) {
        this.datos_entidad.P_NMBRE_ENTDAD = '';
        this.datos_entidad.P_CDGO_ENTDAD=  "",
        this.datos_entidad.P_DRCCION_ENTDAD= "",
        this.datos_entidad.P_CDGO_CNTCTO= "",
        this.datos_entidad.P_CNTCTO_ENTDAD= "",
        this.datos_entidad.P_TPO_MDDA= "",
        this.datos_entidad.P_CDGO_DPRTMNTO= "",
        this.datos_entidad.P_CDGO_MNCPIO= "",
        this.datos_entidad.P_NIT= "",
        this.datos_entidad.P_ESTDO_ENTDAD= "",
        this.datos_entidad.P_ACCION = "R";
        this.titulo = "Registro Información Entidad Cautelar";
        this.tipo_accion = true;
      }
    },

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
           this.addcautelar();
           this.get_entidades();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },
  
      adicionar_datos(item) {
      console.log("entrando a objetos", item);
    
       this.datos_entidad.P_ID_ENTDDES = item.id_entddes;
        this.datos_entidad.P_NMBRE_ENTDAD = item.nmbre_entdad;
        this.datos_entidad.P_CDGO_ENTDAD=  item.cdgo_entdad,
        this.datos_entidad.P_DRCCION_ENTDAD= item.drccion_entdad,
        this.datos_entidad.P_CDGO_CNTCTO= item.cdgo_cntcto,
        this.datos_entidad.P_CNTCTO_ENTDAD= item.cntcto_entdad,
        this.datos_entidad.P_TPO_MDDA= item.tpo_mdda,
        this.datos_entidad.P_CDGO_DPRTMNTO= item.cdgo_dprtmnto,
        this.datos_entidad.P_CDGO_MNCPIO= item.cdgo_mncpio,
        this.datos_entidad.P_NIT= item.nit,
        this.datos_entidad.P_ESTDO_ENTDAD= item.estdo_entdad,
        this.tipo_accion = false;
        this.titulo = "Actualizar Información de Impuestos";
    },

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
          this.updatecautelar();
          this.get_entidades();
          this.$refs.modal.hide("moda_Registro");
        }
      });
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
          this.eliminarcautelar(r_item);
          this.get_entidades();
          this.$refs.modal.hide("moda_Registro");
 

        }
      });
    },

   cancelar_informacion() {
        this.datos_entidad.P_NMBRE_ENTDAD = '';
        this.datos_entidad.P_CDGO_ENTDAD=  "",
        this.datos_entidad.P_DRCCION_ENTDAD= "",
        this.datos_entidad.P_CDGO_CNTCTO= "",
        this.datos_entidad.P_CNTCTO_ENTDAD= "",
        this.datos_entidad.P_TPO_MDDA= "",
        this.datos_entidad.P_CDGO_DPRTMNTO= "",
        this.datos_entidad.P_CDGO_MNCPIO= "",
        this.datos_entidad.P_NIT= "",
        this.datos_entidad.P_ESTDO_ENTDAD= "",
      this.$refs.modal.hide("moda_Registro");
    },
  },
};
</script>

