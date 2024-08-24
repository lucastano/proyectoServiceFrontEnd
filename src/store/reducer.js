import {
  TRAER_CLIENTE_EXITO,
  TRAER_CLIENTES_EXITO,
  ALTA_CLIENTE_EXITO,
  PRESUPUESTAR_REPARACION_EXITO,
  ALTA_TECNICO_EXITO,
  ALTA_ADMIN_EXITO,
  TRAER_TECNICOS_EXITO,
  LOGIN_EXITO,
  LOGOUT_EXITO,
  ACEPTAR_PRESUPUESTO_EXITO,
  TRAER_MENSAJES_EXITO,
  TRAER_PRODUCTOS_EXITO,
  CREAR_PRODUCTO_EXITO,
  TRAER_REPARACIONES_EXITO,
  ALTA_FALLA_EXITO,
  TRAER_FALLAS_EXITO,
} from "./actions";

const initialState = {
  servicios: [],
  clientes: [],
  tecnicos: [],
  admins: [],
  sesion: null,
  mensajes: [],
  productos: [],
  fallas: [],
  //ordenReparacion: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_CLIENTE_EXITO:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
      };
    case TRAER_FALLAS_EXITO:
      return {
        ...state,
        fallas: action.payload,
      };
    case TRAER_CLIENTES_EXITO:
      return {
        ...state,
        clientes: action.payload,
      };
    case TRAER_REPARACIONES_EXITO:
      return {
        ...state,
        servicios: action.payload,
      };
    case ALTA_CLIENTE_EXITO:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
      };
    case PRESUPUESTAR_REPARACION_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
      };
    case ALTA_TECNICO_EXITO:
      return {
        ...state,
        tecnicos: [...state.tecnicos, action.payload],
      };
    case ALTA_ADMIN_EXITO:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    case TRAER_TECNICOS_EXITO:
      return {
        ...state,
        tecnicos: action.payload,
      };
    case LOGIN_EXITO:
      return {
        ...state,
        sesion: action.payload,
      };
    case LOGOUT_EXITO:
      return {
        servicios: [],
        clientes: [],
        tecnicos: [],
        admins: [],
        mensajes: [],
        productos: [],
        fallas: [],
        ordenReparacion: null,
        sesion: null,
      };
    case ALTA_FALLA_EXITO:
      return {
        ...state,
        fallas: [...state.fallas, action.payload],
      };
    case ACEPTAR_PRESUPUESTO_EXITO:
      return {
        ...state,
        servicios: state.servicios.map((servicio) =>
          servicio.id === action.payload.id ? action.payload : servicio
        ),
      };
    case TRAER_MENSAJES_EXITO:
      return {
        ...state,
        mensajes: action.payload,
      };
    case TRAER_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
      };
    case CREAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: [...state.productos, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
