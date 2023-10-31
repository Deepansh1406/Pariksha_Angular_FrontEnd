import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  public getQuestionOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
    
  }
  public getQuestionOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
    
  }


  // Add question in this


  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);

  }

  // get the single  Question

  public getQuestion(qId:any){
    return this._http.get(`${baseUrl}/question/${qId}`);
  }

// Update a signle question

public updateQuestion(question:any){
  return this._http.put(`${baseUrl}/question/`,question);
}

  // Deletee Question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);



  }

  // Evaluating quiz

  public evalQuiz(questions:any){
    return  this._http.post(`${baseUrl}/question/eval-quiz` , questions );
  }
}
