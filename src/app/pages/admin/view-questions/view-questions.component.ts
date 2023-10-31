import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {


    qId:any;
    qTitle:any;
    question:any=[];
    
    
  constructor(private _router:ActivatedRoute,private _question:QuestionService ,private _snak:MatSnackBar){
    
  }
     ngOnInit():void{
       this.qId= this._router.snapshot.params['qid'];
       this.qTitle= this._router.snapshot.params['title'];
       this._question.getQuestionOfQuiz(this.qId).subscribe((data:any)=>{
        console.log("Data", data);
        this.question= data;
       },
       (error)=>{
        console.log('Error ', error)
       }
       )

     }

    //  delete Question


    deleteQuestion(qId:any){
     Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question?',

     }).then((result)=>{
      if(result.isConfirmed){
        // Confirm

        this._question.deleteQuestion(qId).subscribe((data:any)=>{
          this._snak.open("Question Deleted!!!","",{
            duration :3000,
          });
          this.question=this.question.filter((q:any)=>q.qid!=qId);

        },
        (error)=>{
          this._snak.open("Error Occured while Deleting Question",'',{
            duration:3000
          });
          console.log(error);
          
        }
        )
      }
     });
    }
}
