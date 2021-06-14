import React from 'react';
import PropTypes from 'prop-types';
import { Input as RawInput } from 'reactstrap';
import styled from 'styled-components';
import colors from '../../../constants/colors';


const StyledInput = styled(RawInput)`
  padding: 8px 11px;
  ${({ iconEnabled }) => (iconEnabled ? 'padding-left: 35px;' : '')}
  border-radius: 8px;
  background: #EEF1F8 0% 0% no-repeat padding-box;
  border: 0px;
  color: ${colors.TEXT_STRONG};
  height: auto;
  &:focus{
    outline: none;
    box-shadow: 0 0 0 #fff;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  & div:first-child{
    position: absolute;
    padding: 3px 10px;
    width: 35px;
  }
`;

const TextInput = ({ icon, style, ...props }) => {
  if (icon) {
    return (
      <Wrapper style={{ width: style.width }}>
        <div>
          {icon}
        </div>
        <StyledInput iconEnabled {...props} style={{ ...style, width: '100%' }} />
      </Wrapper>
    );
  }
  return <StyledInput style={style} {...props} />;
};

TextInput.propTypes = {
  icon: PropTypes.node,
  style: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

TextInput.defaultProps = {
  icon: null,
  style: {},
};

export default TextInput;
