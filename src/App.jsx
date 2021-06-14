import React from 'react';
import { isEmpty } from 'lodash';
import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import { useAuthContext } from './providers/auth/provider';
import Login from './containers/Login';

function App() {
  const { state: { token, user } } = useAuthContext();
  const isLoggedIn = !isEmpty(user) && !isEmpty(token);
  return (
    <Layout header={isLoggedIn}>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </Layout>
  );
}

export default App;
