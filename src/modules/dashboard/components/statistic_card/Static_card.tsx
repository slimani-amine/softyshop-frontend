import React from "react";
import { Card, Col, Row, Statistic } from "antd";

interface StaticCardProps {
  numberOfStores: number;
  numberOfProducts: number;
  numberOfOrders: number;
}

const StaticCard: React.FC<StaticCardProps> = ({
  numberOfStores,
  numberOfProducts,
  numberOfOrders,
}) => (
  <Row gutter={16}>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic title="Number Of Stores" value={numberOfStores} />
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic
          title="Number Of Products"
          value={numberOfProducts}
          valueStyle={{ color: "#cf1322" }}
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
        <Statistic
          title="Number of Orders"
          value={numberOfOrders}
          valueStyle={{ color: "#cf1322" }}
        />
      </Card>
    </Col>
  </Row>
);

export default StaticCard;
