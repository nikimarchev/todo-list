const initialState = {
    email: undefined
};
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_EMAIL':
        return { ...state, email: action.payload };
      default:
        return state;
    }
  };
  
export default userReducer;  