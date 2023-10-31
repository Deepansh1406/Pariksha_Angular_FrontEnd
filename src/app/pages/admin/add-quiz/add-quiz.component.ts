import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent  implements OnInit{
  
   categories:any=[];

   quizData={
    title:"",
    description:"",
    maxMarks:'',
    numberOfQuestions:"",
    active:true,
    category:{
      cid:'',
    }  
   };

   constructor(private _cat:CategoryService, private _snack: MatSnackBar, private _quiz:QuizServiceService){}
   ngOnInit(): void {
       this._cat.categories().subscribe(
        (data:any)=>{
          this.categories=data;
          // console.log(this.categories);
          
        },
        (error)=>{
          console.log("Error");
          Swal.fire('Error!!', "Error in loading cetegories from Server",'error');
        }
       )
   }

  //  addquiz function

  addquiz(){
    // console.log(this.quizData);
    
    if(this.quizData.title.trim()=='' || this.quizData.title== null){
      this._snack.open("Title Required !!",'',{
        duration :3000 
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success!!', 'Quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: ''
          }
        };
      },
      (error) => {
        Swal.fire('Error!!', 'There is an error while loading data', 'error');
        console.log(error);
      }
    );
    
  }
}
