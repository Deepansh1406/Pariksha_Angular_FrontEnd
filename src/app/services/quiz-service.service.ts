import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private _http:HttpClient) { }
  public quizes(){
    return this._http.get(`${baseUrl}/quiz/`);
    
  }
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`, quiz);

  }
  

  // delete a Quiz form server

  public deleteQuiz(qid:any){
    return this._http.delete(`${baseUrl}/quiz/${qid}`);

  }

  // get a single quiz

  public getQuiz(qid:any){
    return this._http.get(`${baseUrl}/quiz/${qid}`);

  }

  // Update quizes


  public updateQuiz(quiz:any){
    return  this._http.put(`${baseUrl}/quiz/`,quiz );
  }

  // Get quizes of Category

  public getQuizesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);

  }

  // Get active Quizes
  public getActiveQuizes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  // get Active quizes of Category

  public getActiveQuizesOfCategory(cid:any){
 
    return this._http.get(`${baseUrl}/quiz/catgory/active/${cid}`) ;
  }
}
