/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import RegionColor from './RegionColor';
import Map from '../common/Map';

function AppTable({ region, data }) {
  // const [rawData, setRawData] = useState([]);
  // const [data, setData] = useState([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isRoundModalOpen, setIsRoundModalOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState({});
  const [selectedMap, setSelectedMap] = useState({});

  // useEffect(() => {
  //   axios.get('http://localhost:5000/lottery/pension/all').then((response) => {
  //     if (response.data.success) {
  //       setRawData(response.data.data);
  //       if (region === '전체') setData(response.data.data);
  //       else setData(rawData.filter((item) => item.locationSummary === region));
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (region === '전체') setData(rawData);
  //   else setData(rawData.filter((item) => item.locationSummary === region));
  // }, [region]);

  // const onTagClick = () => {
  //   setIsMapModalOpen(true);
  // };

  // const onRoundClick = (e) => {
  //   // console.log(e, a);
  //   console.log(e, record);
  //   setIsRoundModalOpen(true);
  // };

  const columns = [
    {
      title: '순위',
      dataIndex: 'num',
      key: 'num',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '상호명',
      dataIndex: 'shop',
      key: 'shop',
    },
    {
      title: '당첨횟수',
      dataIndex: 'cnt',
      key: 'cnt',
      render: (_, record) => (
        <div className="round-column">
          <p key={`${record.num}first`}>1등: {record.first_cnt}번</p>
          <p className="round-text" key={`${record.num}second`}>
            2등: {record.second_cnt}번
          </p>
          <ExclamationCircleOutlined
            className="round-icon"
            onClick={() => {
              setSelectedRound(record);
              setIsRoundModalOpen(true);
            }}
          />
        </div>
      ),
    },
    {
      title: '지역',
      key: 'locationSummary',
      dataIndex: 'locationSummary',
      // filters: Object.keys(RegionColor)
      //   .slice(1)
      //   .map((item) => ({ text: item, value: item })),
      // onFilter: (value, record) => record.locationSummary.indexOf(value) === 0,
      render: (_, record) => {
        const { locationSummary } = record;
        const color = RegionColor[locationSummary];
        return (
          <>
            <Tag color={color} key={locationSummary}>
              {locationSummary}
            </Tag>
            {record.x && (
              <Button
                type="link"
                onClick={() => {
                  setSelectedMap(record);
                  setIsMapModalOpen(true);
                }}
              >
                <img src="map.png" alt="map" />
              </Button>
            )}
          </>
        );
      },
    },
  ];
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  const isMapModalClose = () => {
    setIsMapModalOpen(false);
  };

  const isRoundModalClose = () => {
    setIsRoundModalOpen(false);
  };

  return (
    <>
      <Row>
        <Col>
          <img className="new-icon" src="new.png" alt="new" />
        </Col>
        <Col>
          <p>22.03.11(12회차) 업데이트</p>
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.num}
      />
      <Modal
        title={selectedMap.shop}
        open={isMapModalOpen}
        onCancel={isMapModalClose}
        footer={null}
      >
        <p className="md-10">주소: {selectedMap.location}</p>
        <Map x={selectedMap.x} y={selectedMap.y} shop={selectedMap.shop} />
      </Modal>
      <Modal
        title={selectedRound.shop}
        open={isRoundModalOpen}
        onCancel={isRoundModalClose}
        footer={null}
      >
        <p className="round-subtitle">1등 {selectedRound.first_cnt}번</p>
        <Row gutter={7}>
          {selectedRound.firstrounds &&
            selectedRound.firstrounds
              .slice(1, -1)
              .split(', ')
              .filter((round) => round !== 'null')
              .map((round) => <Col>{round}회</Col>)}
        </Row>
        <br />
        <p className="round-subtitle">2등 {selectedRound.second_cnt}번</p>
        <Row gutter={7}>
          {selectedRound.secondrounds &&
            selectedRound.secondrounds
              .slice(1, -1)
              .split(', ')
              .filter((round) => round !== 'null')
              .map((round) => <Col>{round}회</Col>)}
        </Row>
      </Modal>
    </>
  );
}

export default AppTable;
