import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GITHUB_LOGIN, GITHUB_PROJECT, GITHUB_TOKEN } from "../constants";
import { GithubApi } from "./GithubApi";

const userHRefClick = (e) => {
  e.preventDefault();
  window.open(e.target.href, "_blank");
};

const userTemplate = (rowData) => {
  return (
    <a onClick={userHRefClick} href={rowData.userUrl}>
      {rowData.userLogin}
    </a>
  );
};

const editTemplate = (rowData) => {
  return (
    <NavLink to={{pathname: `/comments/${rowData.id}`, state: {url: rowData.btnEdit}}} >
      <Button icon="pi pi-pencil" />
    </NavLink>
  );
};

const githubTemplate = (rowData) => {
  return (
    <Button
      icon="pi pi-github"
      onClick={() => {
        window.open(rowData.btnGithub, "_blank");
      }}
    />
  );
};

export const Issues = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const github = new GithubApi(GITHUB_LOGIN, GITHUB_TOKEN, GITHUB_PROJECT);
    github.getIssues().then((issues) => {
      console.log(issues)
      setData(issues);
    });
  }, []);

  return (
    <>
      <DataTable value={data}>
        <Column field="number" header="Номер" style={{ width: "5%" }} />
        <Column
          field="createdDate"
          header="Дата создания"
          style={{ width: "7%" }}
        />
        <Column field="status" header="Статус" style={{ width: "6%" }} />
        <Column
          field="userLogin"
          header="Пользователь"
          style={{ width: "10%" }}
          body={userTemplate}
        />
        <Column field="title" header="Заголовок" style={{ width: "50%" }} />
        <Column field="btnEdit" style={{ width: "3%" }} body={editTemplate} />
        <Column
          field="btnGithub"
          style={{ width: "3%" }}
          body={githubTemplate}
        />
      </DataTable>
    </>
  );
};
