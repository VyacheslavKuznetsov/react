import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";

export function AuthForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        phone: phone,
        password: password,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  let phone = watch("phone");
  let password = watch("password");

  return (
    <Card title="Аутентификация">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="p-float-label">
          <InputText id="phone" {...register("phone", {required: true})}></InputText>
          <label htmlFor="phone">Мобильный телефон</label>
          { errors.phone && <React.Fragment><br/><span className="p-error">Телефон обязателен для заполнения</span></React.Fragment> }
        </span>
        <br />
        <span className="p-float-label">
          <Password id="password" {...register("password", {required: true})} />
          <label htmlFor="password">Пароль</label>
          { errors.password && <React.Fragment><br/><span className="p-error">Пароль обязателен для заполнения</span></React.Fragment> }
        </span>
        <br />
        <Button type="submit" label="Войти" />
      </form>
    </Card>
  );
}
