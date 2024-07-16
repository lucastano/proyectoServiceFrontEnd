import {
  TRAER_SERVICIO_EXITO,
  TRAER_SERVICIO_ERROR,
  TRAER_CLIENTE_EXITO,
  TRAER_CLIENTE_ERROR,
  TRAER_SERVICIOS_CLIENTE_EXITO,
  TRAER_SERVICIOS_CLIENTE_ERROR,
  TRAER_REPUESTOS_EXITO,
  TRAER_REPUESTOS_ERROR,
  TRAER_CLIENTES_EXITO,
  TRAER_CLIENTES_ERROR,
  TRAER_SERVICIOS_EXITO,
  TRAER_SERVICIOS_ERROR,
  ALTA_CLIENTE_EXITO,
  ALTA_CLIENTE_ERROR,
  ALTA_SERVICIO_EXITO,
  ALTA_SERVICIO_ERROR,
  PRESUPUESTAR_REPARACION_EXITO,
  PRESUPUESTAR_REPARACION_ERROR,
  ENTREGAR_REPARACION_EXITO,
  ENTREGAR_REPARACION_ERROR,
  ALTA_TECNICO_EXITO,
  ALTA_TECNICO_ERROR,
  ALTA_ADMIN_EXITO,
  ALTA_ADMIN_ERROR,
  TRAER_TECNICOS_EXITO,
  TRAER_TECNICOS_ERROR,
  LOGIN_EXITO,
  LOGIN_ERROR,
  LOGOUT_EXITO,
  ACEPTAR_PRESUPUESTO_EXITO,
  ACEPTAR_PRESUPUESTO_ERROR,
  RECHAZAR_PRESUPUESTO_EXITO,
  RECHAZAR_PRESUPUESTO_ERROR,
  TERMINAR_REPARACION_EXITO,
  TERMINAR_REPARACION_ERROR,
} from "./actions";

const initialState = {
  servicios: [],
  clientes: [],
  repuestos: [],
  tecnicos: [],
  admins: [],
  sesion: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_SERVICIO_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case TRAER_SERVICIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_CLIENTE_EXITO:
      return {
        ...state,
        clientes: action.payload,
        error: null,
      };
    case TRAER_CLIENTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_SERVICIOS_CLIENTE_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case TRAER_SERVICIOS_CLIENTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_REPUESTOS_EXITO:
      return {
        ...state,
        repuestos: action.payload,
        error: null,
      };
    case TRAER_REPUESTOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_CLIENTES_EXITO:
      return {
        ...state,
        clientes: action.payload,
        error: null,
      };
    case TRAER_CLIENTES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_SERVICIOS_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case TRAER_SERVICIOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ALTA_CLIENTE_EXITO:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
        error: null,
      };
    case ALTA_CLIENTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ALTA_SERVICIO_EXITO:
      return {
        ...state,
        servicios: [...state.servicios, action.payload],
        error: null,
      };
    case ALTA_SERVICIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case PRESUPUESTAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        loading: false,
      };
    case PRESUPUESTAR_REPARACION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ENTREGAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        loading: false,
      };
    case ENTREGAR_REPARACION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ALTA_TECNICO_EXITO:
      return {
        ...state,
        tecnicos: [...state.tecnicos, action.payload],
        error: null,
      };
    case ALTA_TECNICO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ALTA_ADMIN_EXITO:
      return {
        ...state,
        admins: [...state.admins, action.payload],
        error: null,
      };
    case ALTA_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TRAER_TECNICOS_EXITO:
      return {
        ...state,
        tecnicos: action.payload,
        error: null,
      };
    case TRAER_TECNICOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_EXITO:
      return {
        ...state,
        error: null,
        sesion: action.payload,
      };
      return {
        ...state,
        error: null,
        sesion: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT_EXITO:
      return {
        servicios: [],
        clientes: [],
        repuestos: [],
        tecnicos: [],
        admins: [],
        sesion: null,
        error: null,
      };
    case ACEPTAR_PRESUPUESTO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case ACEPTAR_PRESUPUESTO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RECHAZAR_PRESUPUESTO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case RECHAZAR_PRESUPUESTO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TERMINAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case TERMINAR_REPARACION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
