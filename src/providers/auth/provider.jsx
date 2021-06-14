import * as React from 'react';
import PropTypes from 'prop-types';
import { types } from './action';
import Storage from '../../storage';

const AuthContext = React.createContext();
const cachedData = new Storage();

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'deleteUser': {
      return { user: {} };
    }
    case types.LOGIN: {
      const { user, token } = payload;
      cachedData.setItem('user', user);
      cachedData.setItem('token', token);
      return { ...state, user, token };
    }
    case types.LOGOUT: {
      cachedData.removeItem('user');
      cachedData.removeItem('token');
      return { ...state, user: {}, token: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const AuthProvider = ({ children }) => {
  const initialState = {
    token: cachedData.getItem('token'),
    user: cachedData.getItem('user') || {},
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthProvider.defaultProps = {};

export { AuthProvider, useAuthContext };
