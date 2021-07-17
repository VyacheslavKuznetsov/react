import axios from "axios";

export class GithubApi {
  githubLogin   = ""
  githubToken   = ""
  githubProject = ""
  baseUrl       = ""

  constructor(githubLogin, githubToken, githubProject) {
    this.githubLogin = githubLogin;
    this.githubToken = githubToken;
    this.githubProject = githubProject;
    this.baseUrl = `https://api.github.com/repos/${this.githubLogin}/${this.githubProject}`;
  }

  authHeader = () => {
    return `Basic ${btoa(this.githubLogin + ':' + this.githubToken)}`;
  }
  
  getIssues = () => {
    const headers = {
       Authorization: this.authHeader()
    }
    return axios.get(`${this.baseUrl}/issues`, {headers: headers})
      .then((resp) => {
        return resp.data.map((issue) => ({
          status: issue.state,
          createdDate: new Date(issue.created_at).toLocaleString(),
          number: issue.number,
          title: issue.title,
          userLogin: issue.user.login,
          userUrl: issue.user.html_url,
          btnEdit: issue.comments_url,
          btnGithub: issue.html_url
        }))
      }).catch((error) => {
        console.log(error);
      });
  }
}