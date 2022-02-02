
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
            <template #cell(estdo)="row">
              <div v-if="row.item.estdo == 'S'">
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
                <!-- Codigo de Medidas  -->
                <b-form-group
                  class="col-6"
                  label="Codigo:"
                  label-for="Codigo Medida"
                >
                  <b-form-input
                    autofocus
                    id="P_CDGO_MDDA"
                    v-model="datos_medidas.P_CDGO_MDDA"
                    placeholder="Codigo Medida"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Descripción de Medidas  -->
                <b-form-group
                  class="col-6"
                  label="Descripción:"
                  label-for="Descripcion Medida"
                >
                  <b-form-input
                    id="P_DSCRPCION"
                    v-model="datos_medidas.P_DSCRPCION"
                    placeholder="Descripcion Medida"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-input>
                </b-form-group>

                <!-- Estado de Medidas  -->
                <b-form-group class="col-6" label="Estado:" label-for="Estado">
                  <b-form-select
                    id="P_ESTDO"
                    v-model="datos_medidas.P_ESTDO"
                    placeholder="Estado"
                    :options="estado"
                    required
                  ></b-form-select>
                </b-form-group>

                <!-- Observacion de Medidas  -->
                <b-form-group
                  class="col-12"
                  label="Observación Medida:"
                  label-for="Observacion Medida"
                >
                  <b-form-textarea
                    id="P_OBSRVCION"
                    v-model="datos_medidas.P_OBSRVCION"
                    placeholder="Observación Medida"
                    oninput="this.value = this.value.toUpperCase()"
                  ></b-form-textarea>

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
       /* { key: "id_tpo_mdda", label: "#", sortable: true },*/
        { key: "cdgo_mdda", label: "Codigo Medida", sortable: true },
        { key: "dscrpcion", label: "Descripcion", sortable: true },
        { key: "obsrvcion", label: "Observación", sortable: true },
        { key: "estdo", label: "Estado", sortable: true },
        { key: "Acciones", sortable: false },
      ],
      items: [],
      nombres: "",
      titulo: "",
      tipo_accion: true,
      loading: true,
      valida_msg: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mensage_1: "",
      titulo_general: "Registro Tipo de Medidas",
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

      datos_medidas: {
        P_ID_TPO_MDDA: "",
        P_CDGO_MDDA: "",
        P_DSCRPCION: "",
        P_OBSRVCION: "",
        P_ESTDO: "",
        P_ACCION: "",
      },
      totalRows: "",
      perPage: 5,
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
    this.get_medida();
  },

  methods: {
    get_medida() {
      let url = "http://localhost:3000/medidas/lista_tipo_medidas";
      const v_medida = async () => {
        try {
          const resp = await axios.get(url);
          console.log("listando la respuesta de datos", resp.data);
          this.items = resp.data;
          this.totalRows = resp.data.length;
        } catch (error) {
          console.log(error);
        }

        console.log("Respuestas del get", v_medida);
      };

      v_medida();
      this.$root.$emit("bv::refresh::table", "table-transition-example");
    },

    /* Registar tipo medida */
    addmedidas() {
      let url = "http://localhost:3000/medidas/registro_tipo_medida";
      this.datos_medidas.P_ACCION = "R";
      this.titulo = "Registro Información de Tipo de Medida";
      this.tipo_accion = true;
      console.log(this.datos_medidas);
      const v_medida = async () => {
        try {
          const resp = await axios.post(url, this.datos_medidas);
          console.log("entrado a registro medidas", resp.data);
          if (!resp.data.outBinds.O_VLDA) {
            this.get_medida();
            this.msg_title = "Notificación";
            (this.msg_general = "Registrando información con exitos!!"),
              (this.variant_1 = "success");
            this.$bvToast.show("my-toast");
          } else {
            this.msg_title = "Error";
            (this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE),
              (this.variant_1 = "danger");
            this.$bvToast.show("my-toast");
          }
        } catch (error) {
          console.log("ERROR DE REGISTRO", error);
        }
      };

      v_medida();

      this.get_medida();
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
          this.addmedidas();
          this.get_medida();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },

    adicionar_datos(item) {
      console.log("entrando a objetos", item);
      this.datos_medidas.P_ID_TPO_MDDA = item.id_tpo_mdda;
      this.datos_medidas.P_CDGO_MDDA = item.cdgo_mdda;
      this.datos_medidas.P_DSCRPCION = item.dscrpcion;
      this.datos_medidas.P_OBSRVCION = item.obsrvcion;
      this.datos_medidas.P_ESTDO = item.estdo;
      this.tipo_accion = false;
      this.titulo = "Actualizar Información de Tipo de Medidas";
    },

    updatemedida() {
      let url = "http://localhost:3000/medidas/actualizar_tpo_medidas";
      this.datos_medidas.P_ACCION = "A";
      this.titulo = "Actualizar Información de Medidas";
      console.log("entrando al update informacion", this.datos_medidas);

      const v_medida = async () => {
        try {
          const resp = await axios.post(url, this.datos_medidas);
          console.log("saliendo con resultado ", resp.data);
          if (!resp.data.outBinds.O_VLDA) {
            this.msg_title = "Notificación";
            (this.msg_general = "Actualizando información con exitos!!"),
              (this.variant_1 = "success");
            this.$bvToast.show("my-toast");

            this.get_medida();
          } else {
            this.msg_title = "Error";
            (this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE),
              (this.variant_1 = "danger");
            this.$bvToast.show("my-toast");
          }
        } catch (error) {
          console.log("error al actualizar registro ", error);
        }
      };
      v_medida();
      this.get_medida();
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
          this.updatemedida();
          this.get_medida();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },

    /*eliminar registro de impuestos */
    eliminarmedida(r_item) {
      let url = "http://localhost:3000/medidas/eliminar_tipo_medidas";
      this.datos_medidas.P_ACCION = "";
      this.datos_medidas.P_ID_TPO_MDDA = r_item.id_tpo_mdda;
      console.log("entrando a datos eliminado", r_item.id_tpo_mdda);
      const v_medida = async () => {
        try {
          const resp = await axios.post(url, this.datos_medidas);
          console.log("repuesta de informacion eliminacion", resp.data);
          if (!resp.data.outBinds.O_VLDA) {
            this.get_medida();
            this.msg_title = "Notificación";
            (this.msg_general = "Eliminado  información con exitos!!"),
              (this.variant_1 = "success");
            this.$bvToast.show("my-toast");
          } else {
            this.msg_title = "Error";
            (this.msg_general = "Error!! " && resp.data.outBinds.O_MNSJE),
              (this.variant_1 = "danger");
            this.$bvToast.show("my-toast");
          }
        } catch (error) {
          console.log("error al eliminar resgitro", error);
        }
      };
      v_medida();
      this.get_medida();
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
          this.eliminarmedida(r_item);
          this.get_medida();
          this.$refs.modal.hide("moda_Registro");
        }
      });
    },

    limpiar_informacion(valor) {
      if (valor === 1) {
        this.datos_medidas.P_ACCION = "R";
        this.datos_medidas.P_ID_TPO_MDDA = "";
        this.datos_medidas.P_CDGO_MDDA = "";
        this.datos_medidas.P_DSCRPCION = "";
        this.datos_medidas.P_OBSRVCION = "";
        this.datos_medidas.P_ESTDO = "";
        this.titulo = "Registro Información de Tipo Medidas";
        this.tipo_accion = true;
      }
    },

    cancelar_informacion() {
      this.datos_medidas.P_ID_TPO_MDDA = "";
      this.datos_medidas.P_CDGO_MDDA = "";
      this.datos_medidas.P_DSCRPCION = "";
      this.datos_medidas.P_OBSRVCION = "";
      this.datos_medidas.P_ESTDO = "";
      this.$refs.modal.hide("moda_Registro");
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },

  rows() {
    return this.items.length;
  },

  validateBeforeSubmit(scope) {
    this.$validator.validateAll(scope).then((result) => {
      if (result) {
        console.log("Form Submitted!");
        return;
      }
      console.log("Correct them errors!");
    });
  },
};
</script>

