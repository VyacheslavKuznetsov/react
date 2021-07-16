import { Card } from "primereact/card";
import "primereact/resources/themes/saga-green/theme.css";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import { RegForm } from "./RegForm";

export default function Auth(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card
      title="Личный кабинет клиента"
      subTitle="Войдите или зарегистрируйтесь в личном кабинете. При регистрации укажите действующий номер телефона, на него будет направлен пароль через смс"
      style={{ width: "40rem", marginBottom: "2em" }}
    >
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Войти">
          <AuthForm />
        </TabPanel>
        <TabPanel header="Регистрация">
          <RegForm />
        </TabPanel>
      </TabView>
    </Card>
  );
}
