import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';
import { get } from 'lodash';
import Button, { constants } from '../../components/ui/Button';
import TextInput from '../../components/ui/Input';
import { H5 } from '../../components/ui/Typo';
import colors from '../../constants/colors';
import { useAuthContext } from '../../providers/auth/provider';
import TaskAPI from '../../api/tasks';


const StyledModal = styled(Modal)`
  max-width: 300px;
  margin: auto;
  margin-top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  border-radius: 12px;
  & .modal-content {
    border-radius: 12px;
  }
  @media(max-width: 576px){
    align-items: flex-start;
    margin-top: 70px;
    height: calc(100vh - 70px);
  }  
`;

const AddTask = ({ btnStyle, refetch, selectedTask, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState(selectedTask.name || '');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();
  const { state: { token } } = useAuthContext();
  const taskApi = new TaskAPI(token);

  const addTask = async () => {
    setLoading(true);
    try {
      if (!taskName) {
        throw new Error('Task name is required field!');
      }
      const data = await taskApi.createTask({ name: taskName });
      if (get(data, 'name')) {
        setIsOpen(false);
        setTaskName('');
        addToast('Task created successfully', { appearance: 'success' });
        refetch();
      }
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      await taskApi.updateTask(selectedTask.id, { name: taskName });
      setIsOpen(false);
      addToast('Task updated successfully', { appearance: 'success' });
      refetch();
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {icon ? <Button onClick={() => setIsOpen(!isOpen)} type={constants.type.LINK} style={{ padding: 0 }}>{icon}</Button>
        : <Button onClick={() => setIsOpen(!isOpen)} type={constants.type.PRIMARY} style={btnStyle}>+ New Task</Button>}
      <StyledModal isOpen={isOpen} toggle={setIsOpen}>
        <ModalBody style={{ textAlign: 'center', borderRadius: '12px', padding: '20px' }}>
          <FontAwesomeIcon onClick={() => setIsOpen(!isOpen)} icon={faTimes} color={colors.TEXT_STRONG} style={{ position: 'absolute', right: '10', top: '10' }} />
          <H5>+ New Task</H5>
          <br />
          <TextInput value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />
          <Button loading={loading} onClick={selectedTask.id ? updateTask : addTask} type={constants.type.PRIMARY} style={{ width: '100%', marginTop: '10px' }}>+ New Task</Button>
        </ModalBody>
      </StyledModal>
    </>
  );
};

AddTask.propTypes = {
  btnStyle: PropTypes.shape({}),
  refetch: PropTypes.func,
  selectedTask: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  icon: PropTypes.node,
};

AddTask.defaultProps = {
  btnStyle: {},
  refetch: () => { },
  selectedTask: {
    name: '',
    id: '',
  },
  icon: null,
};

export default AddTask;
