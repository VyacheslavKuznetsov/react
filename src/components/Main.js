import React from "react";
import "primereact/resources/themes/saga-green/theme.css";
import MainCard from './MainCard'

export default function Main(props) {
  return (
    <MainCard
      title="Личный кабинет клиента"
      subtitle="Войдите или зарегистрируйтесь в личном кабинете. При регистрации укажите действующий номер телефона, на него будет направлен пароль через смс"
    />
  );
}
