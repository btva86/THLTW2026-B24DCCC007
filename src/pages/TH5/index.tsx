import React from "react";
import { Tabs, Card, Typography } from "antd";

import ClubManagement from "./ClubManagement";
import MemberManagement from "./MemberManagement";
import ActivityManagement from "./ActivityManagement";
import ReportStatistics from "./ReportStatistics";

const { Title } = Typography;
const { TabPane } = Tabs;

const TH05Page = () => {
  return (
    <Card>

      <Title 
        level={3} 
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        Quản lý Câu Lạc Bộ Sinh Viên
      </Title>

      <Tabs 
        defaultActiveKey="1"
        centered
        size="large"
      >

        <TabPane tab="Câu lạc bộ" key="1">
          <ClubManagement />
        </TabPane>

        <TabPane tab="Thành viên" key="2">
          <MemberManagement />
        </TabPane>

        <TabPane tab="Hoạt động" key="3">
          <ActivityManagement />
        </TabPane>

        <TabPane tab="Báo cáo & Thống kê" key="4">
          <ReportStatistics />
        </TabPane>

      </Tabs>

    </Card>
  );
};

export default TH05Page;