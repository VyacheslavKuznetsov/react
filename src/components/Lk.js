import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import 'primereact/resources/themes/saga-green/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"


export default function Lk() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
 
  const onSubmit = (data) => console.log(data);

  return (
<div className="p-grid p-dir-rev">
	<div className="p-col">1</div>
	<div className="p-col">2</div>
	<div className="p-col">3</div>
</div>  );
}
