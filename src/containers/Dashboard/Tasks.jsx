import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { includes, isArray, map } from 'lodash';
import Button, { constants } from '../../components/ui/Button';
import { Col, Row } from '../../components/ui/Grid';
import TextInput from '../../components/ui/Input';
import { H5 } from '../../components/ui/Typo';
import colors from '../../constants/colors';
import AddTask from './AddTask';
import { useAuthContext } from '../../providers/auth/provider';
import TaskAPI from '../../api/tasks';

const Wrapper = styled(Col)`
  border-radius: 12px;
  overflow: hidden;
  margin: 10px 0;
  box-shadow: 0px 3px 6px #0000000A;
  background: white;
  padding: 5px 20px;
  min-height: 200px;
`;

const StyledText = styled(H5)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ strike }) => (strike ? `
    text-decoration: line-through;
    color: ${colors.DEFAULT};
  ` : '')};
`;

const CheckBox = styled(Input)`
  border: 2px solid #95A4AB;
  width: 19px;
  height: 19px;
  margin-top: 3px;
  margin-right: 10px;

  &:checked {
    background: #95A4AB;
    border: 2px solid #95A4AB;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 #fff;
  }
`;

const StyledRow = styled(Row)`
  margin: 0px;
  padding: 25px 0;
  border-bottom: 2px solid ${colors.LIGHT_GREY};
`;

const ActionCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const TaskCol = styled(Col)`
  display: flex;
  align-items: center;
  @media(max-width: 576px){
    text-align: center;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const Tasks = ({ refetch }) => {
  const [tasklist, setTasklist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const { state: { token } } = useAuthContext();
  const { addToast } = useToasts();

  const taskApi = new TaskAPI(token);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getTasks();
      if (isArray(data)) {
        setTasklist(data);
      }
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshData = () => {
    refetch();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      addToast('Task deleted successfully.', { appearance: 'success' });
      refreshData();
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    }
  };

  const markTask = async (id, completed) => {
    try {
      await taskApi.updateTask(id, { completed: !completed });
      refreshData();
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    }
  };

  console.log(loading);

  return (
    <div style={{ padding: '30px 10px' }}>
      <Row style={{ border: '1px solid transparent' }}>
        <TaskCol xs="12" sm="3" md="7"><H5>Tasks</H5></TaskCol>
        <Col xs="12" sm="9" md="5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TextInput value={searchKey} onChange={(e) => setSearchKey(e.target.value)} style={{ width: '65%' }} placeholder="Search by task name" icon={<FontAwesomeIcon icon={faSearch} color={colors.TEXT_STRONG} />} />
          &nbsp;&nbsp;
          <AddTask btnStyle={{ width: '35%' }} refetch={refreshData} />
        </Col>
      </Row>
      <Row>
        <Wrapper>
          {map(tasklist, ({ name, completed, id }) => {
            if (searchKey && !includes(name, searchKey)) {
              return null;
            }
            return (
              <StyledRow>
                <Col xs="9">
                  <StyledText strike={completed} color={colors.BLUE}>
                    <CheckBox onClick={() => markTask(id, completed)} type="checkbox" checked={completed} color={colors.TEXT_STRONG} />
                    {name}
                  </StyledText>
                </Col>
                <ActionCol xs="3" style={{}}>
                  <AddTask selectedTask={{ name, id }} refetch={refreshData} icon={<FontAwesomeIcon icon={faPen} color={colors.TEXT_STRONG} />} />
                  &nbsp;&nbsp;&nbsp;
                  <Button type={constants.type.LINK} style={{ padding: '0' }}><FontAwesomeIcon onClick={() => deleteTask(id)} icon={faTrash} color={colors.TEXT_STRONG} /></Button>
                </ActionCol>
              </StyledRow>
            );
          })}
        </Wrapper>
      </Row>
    </div>
  );
};

Tasks.propTypes = {
  refetch: PropTypes.func,
};

Tasks.defaultProps = {
  refetch: () => {},
};

export default Tasks;
