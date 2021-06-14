import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';

const ContentWrapper = styled.div`
  padding: 15px 0;
  min-height: 100vh;
`;

const Layout = ({ children, header }) => (
  <div style={{ background: '#F4F4F6 0% 0% no-repeat padding-box' }}>
    {header ? <Header /> : null}
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
};

Layout.defaultProps = {
  header: true,
};

export default Layout;
