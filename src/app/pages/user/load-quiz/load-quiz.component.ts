import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any;
  quizes:any;

  constructor( private _route:ActivatedRoute,private _quiz: QuizServiceService){}
  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];
      if(this.catId==0){
        console.log("Load all The Quiz");
        this._quiz.getActiveQuizes().subscribe((data:any)=>{
          this.quizes=data;
          console.log(this.quizes);
        },(error)=>{
          console.log(error);
          alert("Error in Loading All Quizes")
          
        })
      }else{
        console.log("Laod a Specifc quiz");
        this._quiz.getQuizesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizes=data;
          console.log(this.quizes);
          

        },
        (error)=>{
          // alert('Error in Loading quiz data');
          console.log("erorr wh9le loading data");
          
        })    
      }
      
    })


    

      
  }
}
