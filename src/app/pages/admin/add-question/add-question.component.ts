import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent  implements OnInit{


  public  Editor=ClassicEditor;
  qid:any;
  qTitle:any;
  question:any={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answers:'',
  }

 constructor(private _route:ActivatedRoute , private _question: QuestionService){}
 ngOnInit(): void {

  this.qid= this._route.snapshot.params['qid'];
  this.qTitle= this._route.snapshot.params['title'];
  this.question.quiz['qid']=this.qid;
    
 }

 formSubmit(){
  if(this.question.content.trim()=='' || this.question.content==null){
    return;
  }
  if(this.question.option1.trim()=='' || this.question.option1==null){
    return;
  }
  if(this.question.option2.trim()=='' || this.question.option2==null){
    return;
  }
  if(this.question.answers.trim()=='' || this.question.answers==null){
    return;
  }

  //form-submit

  this._question.addQuestion(this.question).subscribe((data:any)=>{
    Swal.fire("SUCCESS!!!",'Question is added successfully','success');
    this.question={
      quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answers:'',
  }
  },
  (error)=>{
    Swal.fire('ERROR!!!','Something went wrong, please try again later.','error');
  }
  )
 }
}
