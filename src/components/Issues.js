import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
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

const commentsTemplate = (rowData) => {
  return (
    <NavLink
      to={{
        pathname: `/comments/${rowData.id}`,
        state: { url: rowData.btnComments },
      }}
    >
      <Button icon="pi pi-comments" />
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
  const github = new GithubApi(GITHUB_LOGIN, GITHUB_TOKEN, GITHUB_PROJECT);
  const [data, setData] = useState([]);
  const [isVisibleAddIssueForm, setAddIssueFormVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [replyIssue, setReplyIssue] = useState();
  const [comment, setComment] = useState("");

  const replyTemplate = (rowData) => {
    return <Button icon="pi pi-reply" onClick={(e) => {setReplyIssue(rowData.number)}} />;
  };
  
  const refresh = () => {
    github.getIssues().then((issues) => {
      setData(issues);
    });
  };

  const clickAddIssue = () => {
    github.postIssues(title, description).then((resp) => refresh());
    setAddIssueFormVisibility(false);
  };

  const clickReplyIssue = () => {
    github.postComments(replyIssue, comment);
    setReplyIssue(undefined);
  }

  const clickResolveIssue = () => {
    if (comment !== "") {
      github.postComments(replyIssue, comment);
    }
    github.patchIssues(replyIssue, "closed").then((resp) => {
      setReplyIssue(undefined);
      refresh();
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Button
        icon="pi pi-refresh"
        onClick={() => {
          refresh();
        }}
      />
      <DataTable value={data} removableSort>
        <Column
          field="number"
          header="Номер"
          style={{ width: "5%" }}
          sortable
        />
        <Column
          field="createdDate"
          header="Дата создания"
          style={{ width: "7%" }}
          sortable
        />
        <Column
          field="status"
          header="Статус"
          style={{ width: "6%" }}
          sortable
        />
        <Column
          field="userLogin"
          header="Пользователь"
          style={{ width: "10%" }}
          body={userTemplate}
          sortable
        />
        <Column
          field="title"
          header="Заголовок"
          style={{ width: "50%" }}
          sortable
        />
        <Column field="btnReply" style={{ width: "3%" }} body={replyTemplate} />
        <Column
          field="btnComments"
          style={{ width: "3%" }}
          body={commentsTemplate}
        />
        <Column
          field="btnGithub"
          style={{ width: "3%" }}
          body={githubTemplate}
        />
      </DataTable>
      <br />
      <Dialog
        header="Добавление Issue"
        visible={isVisibleAddIssueForm}
        style={{ width: "50vw" }}
        onHide={() => {
          setAddIssueFormVisibility(false);
        }}
      >
        <h3>
          <label htmlFor="inputTitle">Заголовок</label>
        </h3>
        <InputTextarea
          id="inputTitle"
          rows={2}
          cols={90}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="inputDescription">Подробности</label>
        <InputTextarea
          id="inputDescription"
          rows={5}
          cols={90}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <br />
        <br />
        <Button onClick={clickAddIssue}>Добавить</Button>
      </Dialog>
      <Dialog
        header="Комментирование"
        visible={replyIssue !== undefined}
        style={{ width: "50vw" }}
        onHide={() => {
          setReplyIssue(undefined);
        }}
      >
        <h3>
          <label htmlFor="inputComment">Комментарий</label>
        </h3>
        <InputTextarea
          id="inputComment"
          rows={2}
          cols={90}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <br />
        <Button onClick={clickReplyIssue}>Ответить</Button>
        <Button onClick={clickResolveIssue}>Решить</Button>
      </Dialog>

      <Button
        icon="pi pi-plus"
        onClick={() => {
          setAddIssueFormVisibility(true);
        }}
      />
    </>
  );
};
