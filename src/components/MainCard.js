import React from "react";
import "primereact/resources/themes/saga-green/theme.css";
import { Card } from "primereact/card";
import Auth from "./Auth";

export default function MainCard(props) {
  return (
    <Card title={props.title} subTitle={props.subtitle}>
      <Auth />
    </Card>
  );
}
