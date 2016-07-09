// import config from '../../config';

const LOAD = 'redux-example/auth/LOAD';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        user: action.user
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        loginError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: 'Login failed'// action.error.message
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.user;
}

export function load() {
  const userString = localStorage['Demo/currentUser'];
  let user = null;

  if (userString) {
    user = JSON.parse(userString);
  }

  return {
    type: LOAD,
    user: user
  };
}

export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.logIn(name, password).then(user => {
      localStorage['Demo/currentUser'] = JSON.stringify(user);
      return user;
    })
  };
}

export function logout() {
  localStorage.removeItem('Demo/currentUser');

  return {
    type: LOGOUT
  };
}
