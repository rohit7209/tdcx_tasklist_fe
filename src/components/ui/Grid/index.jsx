import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container as RawContainer, Row, Col as Column } from 'reactstrap';

const flex = styled.div`
  display: flex;
  flex-direction: row;
  flex: ${({ flex: f = 1 }) => f};
  flex-direction: ${({ type = 'row' }) => type};
`;

const Col = styled(Column)`
  padding: 0;
`;

const Box = styled(flex)`
  height: 100%;
  width: 100%;
  ${({ type, alignItems = 'center', justifyContent = 'center' }) => {
    switch (type) {
      case 'hCenter':
        return `
        justify-content: ${justifyContent};
        `;
      case 'vCenter':
        return `
        align-items: ${alignItems};
        `;
      case 'center':
      default:
        return `
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        `;
    }
  }}
`;

const Container = ({ fluid, children }) => <RawContainer fluid={fluid}>{children}</RawContainer>;

Container.propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  fluid: false,
};

export {
  Container,
  Row,
  Col,
  Box,
};

