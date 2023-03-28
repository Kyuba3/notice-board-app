export const getUser = ({ user }) => user;

const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOGOUT = createActionName('LOGOUT');

export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = payload => ({
  type: LOGOUT,
});


const usersReducer = (statePart = null, action) => {
  switch(action.type) {
    case LOG_IN: 
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return statePart;
  } 
};

export default usersReducer;