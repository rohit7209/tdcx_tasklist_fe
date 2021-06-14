import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { get } from 'lodash';
import styled from 'styled-components';
import DashboardAPI from '../../api/dashboard';
import Card from '../../components/ui/Card';
import { Box, Container, Row, Col } from '../../components/ui/Grid';
import { Para, constants as typoConstants } from '../../components/ui/Typo';
import { useAuthContext } from '../../providers/auth/provider';
import Overview from './Overview';
import Tasks from './Tasks';
import AddTask from './AddTask';

const EmptyBox = styled(Box)`
  width: 100%;
  height: calc(100vh - 150px);
  @media(max-width: 576px){
    height: unset;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const { addToast } = useToasts();
  const { state: { token } } = useAuthContext();

  const fetchDashboardInfo = async () => {
    setLoading(true);
    try {
      const data = await new DashboardAPI(token).getDashboardInfo();
      setInfo(data);
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  return (
    <Container>
      {get(info, 'totalTasks', 0) || loading
        ? (
          <>
            <Overview loading={loading} info={info} />
            <Tasks refetch={fetchDashboardInfo} />
          </>
        )
        : (
          <Row>
            <Col xs="12" sm={{ size: '4', offset: '4' }}>
              <EmptyBox>
                <Card
                  title={<Para size={typoConstants.size.SIZE_3} style={{ textAlign: 'center' }}>You have no task.</Para>}
                  content={<Box><AddTask btnStyle={{ margin: 'auto' }} refetch={fetchDashboardInfo} /></Box>}
                />
              </EmptyBox>
            </Col>
          </Row>
        )}
    </Container>
  );
};

export default Dashboard;
