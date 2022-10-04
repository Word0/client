import React from 'react';
import { Tabs, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import AppTable from '../Main/AppTable';

// const onChange = (key) => {
//   console.log(key);
// };

const items = [
  {
    label: (
      <div>
        로또6/45
        <Tooltip placement="top" title="test">
          <InfoCircleOutlined className="tab__tooltip" />
        </Tooltip>
      </div>
    ),
    key: 'item-1',
    children: <AppTable />,
  }, // remember to pass the key prop
  { label: '연금복권720+', key: 'item-2', children: <AppTable /> },
  { label: '스피또2000', key: 'item-3', children: <AppTable /> },
  { label: '스피또1000', key: 'item-4', children: <AppTable /> },
  { label: '스피또500', key: 'item-5', children: '' },
];

function Main() {
  return (
    <>
      <p className="title">지역별 명당 순위</p>
      <Tabs className="tab" type="card" items={items} />
    </>
  );
}

export default Main;
