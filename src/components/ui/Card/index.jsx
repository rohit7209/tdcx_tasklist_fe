import React from 'react';
import PropTypes from 'prop-types';
import { Card as CardBody, CardTitle, CardText } from 'reactstrap';
import styled from 'styled-components';
import Button, { constants as btnConstants } from '../Button';

const StyledCardBody = styled(CardBody)`
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px #00000029;
  background: white;
  border: 0px;
  &:focus{
    border: 1px solid #00000029;
  }
`;

const Card = ({ title, content, action, actionText, titleStyle, style }) => (
  <StyledCardBody body style={style}>
    <CardTitle style={titleStyle}>{title}</CardTitle>
    {content ? <CardText>{content}</CardText> : null}
    {action ? <Button type={btnConstants.type.PRIMARY} onClick={action} style={{ width: '50%', margin: 'auto' }}>{actionText}</Button> : null}
  </StyledCardBody>
);

Card.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  action: PropTypes.func,
  actionText: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

Card.defaultProps = {
  actionText: 'Ok',
  titleStyle: {},
  style: {},
  action: null,
};

export default Card;
