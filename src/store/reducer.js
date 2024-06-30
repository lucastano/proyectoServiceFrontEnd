

const initialState = {
    servicios: [],
    clientes: [],
    repuestos: [],
    tecnicos: [],
    admins: [],
    sesion: null,
    error: null
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TRAER_SERVICIO_EXITO':
            return {
                ...state,
                servicios: action.payload,
                error: null
            };
        case 'TRAER_SERVICIO_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'TRAER_CLIENTE_EXITO':
            return {
                ...state,
                clientes: action.payload,
                error: null
            };
        case 'TRAER_CLIENTE_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'TRAER_SERVICIOS_CLIENTE_EXITO':
            return {
                ...state,
                servicios: action.payload,
                error: null
            };
        case 'TRAER_SERVICIOS_CLIENTE_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'TRAER_REPUESTOS_EXITO':
            return {
                ...state,
                repuestos: action.payload,
                error: null
            };
        case 'TRAER_REPUESTOS_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'TRAER_CLIENTES_EXITO':
            return {
                ...state,
                clientes: action.payload,
                error: null
            };
        case 'TRAER_CLIENTES_ERROR':
            return {
                ...state,
                error: action.payload
            };    
        case 'TRAER_SERVICIOS_EXITO':
            return {
                ...state,
                servicios: action.payload,
                error: null
            };
        case 'TRAER_SERVICIOS_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'ALTA_CLIENTE_EXITO':
            return {
                ...state,
                clientes: [...state.clientes, action.payload],
                error: null
            };
        case 'ALTA_CLIENTE_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'ALTA_SERVICIO_EXITO':
            return {
                ...state,
                servicios: [...state.servicios, action.payload],
                error: null
            };
        case 'ALTA_SERVICIO_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'PRESUPUESTAR_SERVICIO_EXITO':
            return {
                ...state,
                servicios: state.servicios.map(servicio =>
                    servicio.id === action.payload.id ? action.payload : servicio
                ),
                loading: false
            };
        case 'PRESUPUESTAR_SERVICIO_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'ALTA_TECNICO_EXITO':
            return {
                ...state,
                tecnicos: [...state.tecnicos, action.payload],
                error: null
            };
        case 'ALTA_TECNICO_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'ALTA_ADMIN_EXITO':
            return {
                ...state,
                admins: [...state.admins, action.payload],
                error: null
            };
        case 'ALTA_ADMIN_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'TRAER_TECNICOS_EXITO':
            return {
                ...state,
                tecnicos: action.payload,
                error: null
            };
        case 'TRAER_TECNICOS_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'LOGIN_CLIENTE_EXITO':
            return {
                ...state,
                error: null,
                sesion: action.payload
            };
        case 'LOGIN_TECNICO_EXITO':
            return {
                ...state,
                error: null,
                sesion: action.payload
            };
        case 'LOGIN_ADMIN_EXITO':
            return {
                ...state,
                error: null,
                sesion: action.payload
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'LOGOUT_EXITO':
            return {
                servicios: [],
                clientes: [],
                repuestos: [],
                tecnicos: [],
                admins: [],
                sesion: null,
                error: null
            };
        default:
            return state;
    }
}


export default reducer;