import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import { get, map } from 'lodash';
import Card from '../../components/ui/Card';
import { Para, constants as typoConstants, H1, Small, H5 } from '../../components/ui/Typo';
import { Row, Col } from '../../components/ui/Grid';
import colors from '../../constants/colors';

const DetailsCardBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin: 0 10px;
  box-shadow: 0px 3px 6px #0000000A;
  @media(max-width: 576px){
    margin: 0 0 10px 0;
    border-radius: 0px;
  }
`;

const Li = styled.li`
  &>p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    ${({ strike }) => (strike ? 'text-decoration: line-through' : '')};
  }
`;

// eslint-disable-next-line react/prop-types
const DetailsCard = ({ title, content, style }) => (
  <DetailsCardBox>
    <Card
      title={<H5 color={colors.TEXT_STRONG} size={typoConstants.size.SIZE_3} style={{ margin: 0 }}>{title}</H5>}
      content={content}
      style={{ borderRadius: '0', boxShadow: '0 0 0 transparent', height: '160px', paddingBottom: 0, ...style }}
    />
  </DetailsCardBox>
);

const colorList = [colors.BLUE, colors.DEFAULT];

const renderCustomizedLabel = ({ fill, name, x, y }) => <text x={x} y={y + 10} fill={fill} style={{ fontSize: 12 }}>{name}</text>;

const Overview = ({ info }) => { // loading
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData([
      { name: 'Completed Tasks', value: get(info, 'tasksCompleted', 0) },
      { name: 'Incomplete Tasks', value: get(info, 'totalTasks', 0) - get(info, 'tasksCompleted', 0) },
    ]);
  }, [info]);

  return (
    <Row>
      <Col xs="12" sm="4">
        <DetailsCard
          title="Tasks Completed"
          content={(
            <H1 size={typoConstants.size.SIZE_0} color={colors.BLUE} style={{ display: 'flex', marginBottom: '15px' }}>
              {get(info, 'tasksCompleted')}
              <Small style={{ display: 'flex', alignItems: 'flex-end' }}>
                /
                {get(info, 'totalTasks')}
              </Small>
            </H1>
          )}
        />
      </Col>
      <Col xs="12" sm="4">
        <DetailsCard
          title="Latest Created Tasks"
          content={(
            <ul>
              {map(get(info, 'latestTasks', []), ({ name, completed }) => <Li strike={completed}><Para>{name}</Para></Li>)}
            </ul>
          )}
        />
      </Col>
      <Col xs="12" sm="4">
        <DetailsCard
          style={{ paddingTop: 0 }}
          content={(
            <div style={{ width: '100%', height: '140px', display: 'flex', justifyContent: 'center' }}>
              <PieChart height={140} width={240}>
                <Pie
                  data={chartData}
                  cx={60}
                  cy={60}
                  labelLine
                  label={renderCustomizedLabel}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    // eslint-disable-next-line react/no-array-index-key
                    chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={colorList[index]} />)
                  }
                </Pie>
              </PieChart>
            </div>
          )}
        />
      </Col>
    </Row>
  );
};

Overview.propTypes = {
  info: PropTypes.shape({}),
  // loading: PropTypes.bool,
};

Overview.defaultProps = {
  info: {},
  // loading: false,
};

export default Overview;
