import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseApiUrl = environment.apiUrl

  public login(loginData: any) {
    return this.http.post(this.baseApiUrl + `/login`, loginData);
  }
  
  public register(registerData: any) {
    return this.http.post(this.baseApiUrl + `/register`, registerData);
  }

  public createWebsiteForQuestions(createWebsite: any) {
    return this.http.post(this.baseApiUrl + `/questions`, createWebsite);
  }

  public getAllWebsites() {
    return this.http.get(this.baseApiUrl + `/questions`);
  }

  public getWebsitesQuestionsById(id: number) {
    return this.http.get(this.baseApiUrl + `/questions/${id}`);
  }

  public getUserById(id: number) {
    return this.http.get(this.baseApiUrl + `/users/${id}`);
  }

  public createAnswer(createAnswerData: any) {
    return this.http.post(this.baseApiUrl + `/answer`, createAnswerData);
  }

  public getAllWebsiteAnswers(id: number) {
    return this.http.get(this.baseApiUrl + `/answer/site/${id}`);
  }

  public getAnswerById(id: number) {
    return this.http.get(this.baseApiUrl + `/answer/${id}`);
  }
}
