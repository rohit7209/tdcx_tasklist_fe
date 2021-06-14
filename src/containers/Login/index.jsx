import React, { useState } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import { get } from 'lodash';
import Button, { constants } from '../../components/ui/Button';
import CardLayout from '../../components/ui/Card';
import { Box, Row } from '../../components/ui/Grid';
import TextInput from '../../components/ui/Input';
import { H5 } from '../../components/ui/Typo';
import AuthAPI from '../../api/auth';
import { useAuthContext } from '../../providers/auth/provider';
import { loginAction } from '../../providers/auth/action';

const StyledCardLayout = styled(Box)`
  max-width: 300px;
  width: 100%;
  margin: auto;
`;

const Login = () => {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { dispatch: dispatchAuth } = useAuthContext();

  const login = async () => {
    setLoading(true);
    try {
      if (!name || !apiKey) {
        throw new Error('All fields are required.');
      }
      const data = await new AuthAPI().login({ name, apiKey });
      dispatchAuth(loginAction({
        token: get(data, 'token.token'),
        user: {
          name: get(data, 'token.name'),
          image: get(data, 'image'),
        },
      }));
    } catch (e) {
      addToast(e.message, {
        appearance: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ height: '100vh', margin: 0 }}>
      <StyledCardLayout style={{}}>
        <CardLayout
          title={<H5>Login</H5>}
          content={(
            <>
              <TextInput value={name} onChange={({ target }) => setName(target.value)} style={{ margin: '10px 0' }} placeholder="Name" />
              <TextInput value={apiKey} onChange={({ target }) => setApiKey(target.value)} style={{ margin: '10px 0' }} placeholder="API Key" />
              <Button loading={loading} onClick={login} type={constants.type.PRIMARY} style={{ width: '100%' }}>Login</Button>
            </>
          )}
        />
      </StyledCardLayout>
    </Row>
  );
};

export default Login;
