import { Card } from "primereact/card";
import "primereact/resources/themes/saga-green/theme.css";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import { Comments } from "./Comments";
import { Issues } from "./Issues";
import { RegForm } from "./RegForm";
import { history } from "../App";
import { withRouter } from "react-router";

const mapUrlToProps = {
  "/auth": {
    index: 0,
  },
  "/reg": {
    index: 1,
  },
  "/issues": {
    index: 2,
    isIssues: true,
  },
  "/comments": {
    index: 2,
    isIssues: false,
  },
};

const mapPropsToUrl = (activeIndex, isIssues) => {
  switch (activeIndex) {
    case 0:
      return "/auth";
    case 1:
      return "/reg";
    case 2: {
      if (isIssues || isIssues === undefined) {
        return "/issues";
      } else {
        return "/comments";
      }
    }
  }
};

function MainLayout(props) {
  const currentMap = mapUrlToProps[props.url];
  if (currentMap === undefined) {
    currentMap = mapUrlToProps["auth"];
  }

  const [activeIndex, setActiveIndex] = useState(currentMap.index);
  const [isIssues, setIssues] = useState(currentMap.isIssues);

  const handleTabChange = (e) => {
    const url = mapPropsToUrl(e.index, isIssues);
    history.push(url);
  };

  return (
    <Card
      title="Личный кабинет клиента"
      subTitle="Войдите или зарегистрируйтесь в личном кабинете. При регистрации укажите действующий номер телефона, на него будет направлен пароль через смс"
      style={{ width: "100rem", marginBottom: "2em" }}
    >
      <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
        <TabPanel header="Войти">
          <AuthForm />
        </TabPanel>
        <TabPanel header="Регистрация">
          <RegForm />
        </TabPanel>
        <TabPanel header="Issues">
          {isIssues && <Issues />}
          {isIssues === false && <Comments />}
        </TabPanel>
      </TabView>
    </Card>
  );
}

export default withRouter(MainLayout);
