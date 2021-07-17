import { Card } from "primereact/card";
import "primereact/resources/themes/saga-green/theme.css";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { AuthForm } from "./AuthForm";
import Comments from "./Comments";
import { Issues } from "./Issues";
import { RegForm } from "./RegForm";

const mapUrlToProps = (url, params) => {
  switch (url) {
    case "auth": return {
      index: 0
    }
    case "reg": return {
      index: 1
    }
    case "issues": return {
      index: 2,
      isIssues: true
    }
    case "comments":  return {
      index: 2,
      isIssues: false,
      issueId: params.issue
    }
    default:
      throw new Error(`Не обрабатываемый url '${url}'`);
  }
};

const mapPropsToUrl = (activeIndex, isIssues, issueId) => {
  switch (activeIndex) {
    case 0:
      return "/auth";
    case 1:
      return "/reg";
    case 2: {
      if (isIssues || isIssues === undefined) {
        return "/issues";
      } else {
        return `/comments/${issueId}`;
      }
    }
    default: {
      throw new Error("Необработанная вкладка");
    }
  }
};

function MainLayout(props) {
  const mapping = mapUrlToProps(props.url, props.match.params);

  const [activeIndex] = useState(mapping.index);
  const [isIssues] = useState(mapping.isIssues);
  const [issueId] = useState(mapping.issueId);

  const handleTabChange = (e) => {
    const url = mapPropsToUrl(e.index, isIssues, issueId);
    props.history.push(url);
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
