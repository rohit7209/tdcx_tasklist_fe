import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button as Btn } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../constants/colors';


const constants = {
  type: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger',
    LINK: 'link',
  },
};

const StyledBtn = styled(Btn)`
  ${({ color }) => {
    switch (color) {
      case constants.type.LINK:
        return '';
      case constants.type.PRIMARY:
        return `
          background: ${colors.BLUE};
        `;
      default:
        return '';
    }
  }}
  border-radius: 8px;
  padding: 11px 22px;
  font-size: 14px;
  width: auto;
  border: 0px;
  text-decoration: none;
  &:focus{
    outline: none;
    box-shadow: 0 0 0 #fff;
  }
`;
const Button = ({ children, type, loading, ...props }) => (
  <StyledBtn color={type} {...props}>
    {loading ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /> : children}
  </StyledBtn>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(constants.type),
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: constants.type.PRIMARY,
  loading: false,
};

export default Button;
export { constants };
