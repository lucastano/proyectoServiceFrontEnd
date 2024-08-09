import {
  TRAER_SERVICIO_EXITO,
  TRAER_CLIENTE_EXITO,
  TRAER_SERVICIOS_CLIENTE_EXITO,
  TRAER_REPUESTOS_EXITO,
  TRAER_CLIENTES_EXITO,
  TRAER_SERVICIOS_EXITO,
  ALTA_CLIENTE_EXITO,
  ALTA_SERVICIO_EXITO,
  PRESUPUESTAR_REPARACION_EXITO,
  ENTREGAR_REPARACION_EXITO,
  ALTA_TECNICO_EXITO,
  ALTA_ADMIN_EXITO,
  TRAER_TECNICOS_EXITO,
  LOGIN_EXITO,
  LOGOUT_EXITO,
  ACEPTAR_PRESUPUESTO_EXITO,
  RECHAZAR_PRESUPUESTO_EXITO,
  TERMINAR_REPARACION_EXITO,
  CAMBIAR_PRESUPUESTO_EXITO,
  CAMBIAR_SERVICIO_EXITO,
  LIMPIAR_ERROR,
  POST_MENSAJE_EXITO,
  TRAER_MENSAJES_EXITO,
  TRAER_PRODUCTOS_EXITO,
  CREAR_PRODUCTO_EXITO,
  DISPATCH_ERROR
} from "./actions";

const initialState = {
  servicios: [],
  clientes: [],
  repuestos: [],
  tecnicos: [],
  admins: [],
  sesion: null,
  error: null,
  mensajes: [],
  productos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH_ERROR:
      return {};
    case TRAER_SERVICIO_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case TRAER_CLIENTE_EXITO:
      return {
        ...state,
        clientes: action.payload,
        error: null,
      };
    case TRAER_SERVICIOS_CLIENTE_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case TRAER_REPUESTOS_EXITO:
      return {
        ...state,
        repuestos: action.payload,
        error: null,
      };
    case TRAER_CLIENTES_EXITO:
      return {
        ...state,
        clientes: action.payload,
        error: null,
      };
    case TRAER_SERVICIOS_EXITO:
      return {
        ...state,
        servicios: action.payload,
        error: null,
      };
    case ALTA_CLIENTE_EXITO:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
        error: null,
      };
    case ALTA_SERVICIO_EXITO:
      return {
        ...state,
        servicios: [...state.servicios, action.payload],
        error: null,
      };
    case PRESUPUESTAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        loading: false,
      };
    case ENTREGAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        loading: false,
      };
    case ALTA_TECNICO_EXITO:
      return {
        ...state,
        tecnicos: [...state.tecnicos, action.payload],
        error: null,
      };
    case ALTA_ADMIN_EXITO:
      return {
        ...state,
        admins: [...state.admins, action.payload],
        error: null,
      };
    case TRAER_TECNICOS_EXITO:
      console.log('tecnicos: ', action.payload);
      return {
        ...state,
        tecnicos: action.payload,
        error: null,
      };
    case LOGIN_EXITO:
      return {
        ...state,
        error: null,
        sesion: action.payload,
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
    case RECHAZAR_PRESUPUESTO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case TERMINAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case CAMBIAR_PRESUPUESTO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case LIMPIAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CAMBIAR_SERVICIO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
        error: null,
      };
    case POST_MENSAJE_EXITO:
      return {
        ...state,
        mensajes: [...state.mensajes, action.payload],
        error: null,
      };
    case TRAER_MENSAJES_EXITO:
      return {
        ...state,
        mensajes: action.payload,
        error: null,
      };
    case TRAER_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
        error: null,
      };
    case CREAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: [...state.productos, action.payload],
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
