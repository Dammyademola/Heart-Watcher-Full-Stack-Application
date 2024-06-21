const initialState = {
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        console.log('Login success action dispatched');
        return {
          ...state,
          isAuthenticated: true
        };
      case 'LOGOUT':
        console.log('Logout action dispatched');
        return {
          ...state,
          isAuthenticated: false
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  