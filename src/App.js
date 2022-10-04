import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/common/AppHeader';
import AppFooter from './components/common/AppFooter';

import MainPage from './components/Main';
import MapPage from './components/Map/index';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="content">
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </Router>
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;
