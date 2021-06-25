import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import { AuthForm } from "./AuthForm";
import { RegForm } from "./RegForm";

export default function Auth(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
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
  );
}
