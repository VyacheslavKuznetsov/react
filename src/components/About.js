import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

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
    <div>
      <p>About</p>
      <br />
      <nav>
        <Link to="/main">Main</Link>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Фамилия: </label>
        <input {...register("surname", { required: true})} />
        {errors.surname && <span>Фамилия обязательна для заполнеия</span>}
        <br/>
        <label>Имя: </label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Имя обязательно для заполнеия</span>}
        <br/>
        <label>Отчество: </label>
        <input {...register("patronymic", { required: true })} />
        {errors.patronymic && <span>Отчество обязательно для заполнеия</span>}
        <br/>
        <input type="submit" />
      </form>
    </div>
  );
}
