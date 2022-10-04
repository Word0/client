import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Link } = Anchor;

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <img className="logo-image" src="money-bag.png" alt="logo" />
          <a className="header-title" href="/">
            로또 명당 순위
          </a>
          <img className="logo-image" src="money-bag.png" alt="logo" />
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/" title="전체 순위" />
            {/* <Link href="/map" title="지도로 보기" /> */}
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer placement="right" closable={false} onClose={onClose} open={visible}>
            <Anchor targetOffset="65">
              <Link href="/" title="전체 순위" />
              {/* <Link href="/map" title="지도로 보기" /> */}
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
