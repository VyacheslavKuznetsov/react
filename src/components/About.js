import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import 'primereact/resources/themes/saga-green/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"


export default function About() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("surname"));
  console.log(watch("name"));
  console.log(watch("patronymic"));

  return (
    <div className="card">
      <p>About</p>
      <br />
      <nav>
        <Link to="/main">Main</Link>
      </nav>
      <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
        <label className="p-field">Фамилия: </label>
        <input className="p-field" {...register("surname", { required: true})} />
        {errors.surname && <span className="p-error" >Фамилия обязательна для заполнеия</span>}
        <br/>
        <label className="p-field">Имя: </label>
        <input className="p-field" {...register("name", { required: true })} />
        {errors.name && <span className="p-error">Имя обязательно для заполнеия</span>}
        <br/>
        <label className="p-field">Отчество: </label>
        <input className="p-field" {...register("patronymic", { required: true })} />
        {errors.patronymic && <span className="p-error">Отчество обязательно для заполнеия</span>}
        <br/>
        <input type="submit" />
      </form>
    </div>
  );
}
