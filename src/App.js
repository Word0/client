import { Layout } from "antd";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./components/common/AppHeader";
import AppFooter from "./components/common/AppFooter";

import Router from "./Router";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="content">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;
