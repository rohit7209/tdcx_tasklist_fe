import React from 'react';
import styled from 'styled-components';
import Button, { constants as btnConstants } from '../../../components/ui/Button';
import { Col, Container, Row, Box } from '../../../components/ui/Grid';
import { constants as typoConstants, Para } from '../../../components/ui/Typo';
import colors from '../../../constants/colors';
import { logoutAction } from '../../../providers/auth/action';
import { useAuthContext } from '../../../providers/auth/provider';

const Wrapper = styled.header`
  box-shadow: 0px 3px 6px #00000029;

`;

const ProfileAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 200px;
`;

function Header() {
  const { dispatch, state: { user = {} } } = useAuthContext();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <Wrapper>
      <Container fluid>
        <Row style={{ justifyContent: 'center', padding: '4px 5%' }}>
          <Col xs="6">
            <Box type="vCenter">
              <ProfileAvatar src="https://i.pinimg.com/474x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg" />
              <Para size={typoConstants.size.SIZE_3} style={{ margin: '0 0 0 10px' }}>
                {user.name}
              </Para>
            </Box>
          </Col>
          <Col xs="6">
            <Box style={{ justifyContent: 'flex-end' }}>
              <Button onClick={logout} type={btnConstants.type.LINK} style={{ color: colors.DEFAULT }}>Logout</Button>
            </Box>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default Header;
