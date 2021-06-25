import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import ReactDadataBox from "react-dadata-box";
import axios from "axios";

export function RegForm(props) {
  const [agreement, setAgreement] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (!agreement) {
      return
    }
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        phone: phone,
        password: password,
        name: name,
        surname: surname,
        patronymic: patronymic,
        birthdate: birthdate,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  watch("fio");
  let phone = watch("phone");
  let password = watch("password");
  let surname = watch("surname");
  let name = watch("name");
  let patronymic = watch("patronymic");
  watch("password2");
  let birthdate = watch("birthdate");

  const handleChange = (suggestion) => {
    setValue("surname", suggestion.data.surname);
    setValue("name", suggestion.data.name);
    setValue("patronymic", suggestion.data.patronymic);
  };

  return (
    <Card title="Регистрация" style={{ width: "30rem", marginBottom: "2em" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactDadataBox
          token="cb23c52aebca84540b30e05d2b1cfa0a2ef46b48"
          type="fio"
          onChange={handleChange}
        />
        <br />
        <span className="p-float-label">
          <InputText id="phone" {...register("phone", {required: true})}></InputText>
          <label htmlFor="phone">Мобильный телефон</label>
          {errors.phone && <React.Fragment><br/><span className="p-error">Телефон обязателен для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <InputText id="surname" {...register("surname", {required: true})}></InputText>
          <label htmlFor="surname">Фамилия</label>
          {errors.surname && <React.Fragment><br/><span className="p-error">Фамилия обязательна для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <InputText id="name" {...register("name", {required: true})}></InputText>
          <label htmlFor="name">Имя</label>
          {errors.name && <React.Fragment><br/><span className="p-error">Имя обязательно для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <InputText id="patronymic" {...register("patronymic", {required: true})}></InputText>
          <label htmlFor="patronymic">Отчество</label>
          {errors.patronymic && <React.Fragment><br/><span className="p-error">Отчество обязательно для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <Calendar
            id="birthdate"
            monthNavigator
            yearNavigator
            yearRange="1900:2070"
            {...register("birthdate", {required: true})}
          />
          <label htmlFor="birthdate">Дата рождения</label>
          {errors.birthdate && <React.Fragment><br/><span className="p-error">Дата рождения обязательна для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <Password id="password" {...register("password", {required: true})} />
          <label htmlFor="password">Пароль</label>
          {errors.password && <React.Fragment><br/><span className="p-error">Пароль обязателен для заполнения</span></React.Fragment>}
        </span>
        <br />
        <span className="p-float-label">
          <Password
            id="password2"
            {...register("password2", {
              validate: (value) => value === password,
            })}
          />
          <label htmlFor="password2">Повторите пароль</label>
          {errors.password2 && (
            <div>
              <br />
              <span className="p-error">Пароли должны совпадать</span>
            </div>
          )}
        </span>
        <br />
        <div className="p-field-checkbox">
          <Checkbox
            inputId="agreement"
            checked={agreement}
            onChange={e => setAgreement(e.checked)}
          />
          <label htmlFor="agreement">
            Я даю согласие на обработку персональных данных
          </label>
          {!agreement && (
            <div>
              <br />
              <span className="p-error">Соглашение нужно принять</span>
            </div>
          )}
        </div>
        <br />
        <Button type="submit" label="Регистрация" />
      </form>
    </Card>
  );
}
