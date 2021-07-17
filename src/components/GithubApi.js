import axios from "axios";

export class GithubApi {
  githubLogin = "";
  githubToken = "";
  githubProject = "";
  baseUrl = "";

  constructor(githubLogin, githubToken, githubProject) {
    this.githubLogin = githubLogin;
    this.githubToken = githubToken;
    this.githubProject = githubProject;
    this.baseUrl = `https://api.github.com/repos/${this.githubLogin}/${this.githubProject}`;
  }

  headers = () => ({
    Authorization: `Basic ${btoa(this.githubLogin + ":" + this.githubToken)}`
  })

  getIssues = () => {
    return axios
      .get(`${this.baseUrl}/issues`, {headers: this.headers()})
      .then((resp) => {
        return resp.data.map((issue) => ({
          id: issue.id,
          status: issue.state,
          createdDate: new Date(issue.created_at).toLocaleString(),
          number: issue.number,
          title: issue.title,
          userLogin: issue.user.login,
          userUrl: issue.user.html_url,
          btnEdit: issue.comments_url,
          btnGithub: issue.html_url,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getComments = (url) => {
    return axios
      .get(url, {headers: this.headers()})
      .then((resp) => {
        return resp.data.map((comment) => ({
          createdDate: new Date(comment.created_at).toLocaleString(),
          userLogin: comment.user.login,
          userUrl: comment.user.html_url,
          body: comment.body,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
