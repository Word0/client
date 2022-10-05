import React, { useState, useEffect } from "react";
import { Tabs, Tooltip, Dropdown, Menu, Space, Button, Row, Col } from "antd";
import { InfoCircleOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppTable from "./AppTable";
import RegionColor from "./RegionColor";

function Main({ type }) {
  let navigate = useNavigate();
  const all = Object.keys(RegionColor)[0];
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_PROD_URL
      : "http://localhost:5000";
  const [lotteryData, setLotteryData] = useState([]);
  const [pensionData, setPensionData] = useState([]);
  const [sp2000Data, setSp2000Data] = useState([]);
  const [sp1000Data, setSp1000Data] = useState([]);
  const [sp500Data, setSp500Data] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(all);

  useEffect(() => {
    axios.get(`${BASE_URL}/lottery/lotto/all`).then((response) => {
      if (response.data.success) {
        setLotteryData(response.data.data);
      }
    });
    axios.get(`${BASE_URL}/lottery/pension/all`).then((response) => {
      if (response.data.success) {
        setPensionData(response.data.data);
      }
    });
    axios.get(`${BASE_URL}/lottery/sp2000/all`).then((response) => {
      if (response.data.success) {
        setSp2000Data(response.data.data);
      }
    });
    axios.get(`${BASE_URL}/lottery/sp2000/all`).then((response) => {
      if (response.data.success) {
        setSp1000Data(response.data.data);
      }
    });
    axios.get(`${BASE_URL}/lottery/sp500/all`).then((response) => {
      if (response.data.success) {
        setSp500Data(response.data.data);
      }
    });
  }, []);

  const onClick = ({ key }) => {
    setSelectedRegion(key);
  };

  const onTabClick = (key) => {
    navigate(`/${key}`);
  };

  const filtRegion = (data) => {
    if (selectedRegion === all) return data;
    return data.filter((item) => item.locationSummary === selectedRegion);
  };

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
      key: "lotto",
      children: (
        <AppTable region={selectedRegion} data={filtRegion(lotteryData)} />
      ),
    }, // remember to pass the key prop
    {
      label: "연금복권720+",
      key: "pension",
      children: (
        <AppTable region={selectedRegion} data={filtRegion(pensionData)} />
      ),
    },
    {
      label: "스피또2000",
      key: "sp2000",
      children: <AppTable data={filtRegion(sp2000Data)} />,
    },
    {
      label: "스피또1000",
      key: "sp1000",
      children: <AppTable data={filtRegion(sp1000Data)} />,
    },
    {
      label: "스피또500",
      key: "sp500",
      children: <AppTable data={filtRegion(sp500Data)} />,
    },
  ];

  const menu = (
    <Menu
      onClick={onClick}
      items={Object.keys(RegionColor).map((region) => ({
        key: region,
        label: region,
      }))}
    />
  );
  return (
    <>
      <p className="title">전국 명당 순위</p>
      <Row
        className="region-select"
        gutter={30}
        justify="center"
        align="middle"
      >
        <Col>
          <p className="region__title">지역 선택</p>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <Button>
              <Space>
                {selectedRegion}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Tabs
        className="tab"
        type="card"
        items={items}
        defaultActiveKey={type}
        onChange={onTabClick}
        size="small"
      />
    </>
  );
}

export default Main;
