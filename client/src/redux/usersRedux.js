export const getUser = ({ user }) => user;

const createActionName = (actionName) => `app/users/${actionName}`;
const LOGIN = createActionName('LOGIN');
const LOGOUT = createActionName('LOGOUT');

export const login = payload => ({
  type: LOGIN,
  payload
});

export const logout = payload => ({
  type: LOGOUT,
});


const usersReducer = (statePart = null, action) => {
  switch(action.type) {
    case LOGIN: 
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return statePart;
  } 
};

export default usersReducer;