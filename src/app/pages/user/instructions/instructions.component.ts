import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

qid:any;
quiz:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizServiceService, private _router:Router){}
  ngOnInit(): void {
      
    this.qid= this._route.snapshot.params['qid'];
    // console.log("this is qid",this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.quiz= data
      
    },
    (error)=>{
      console.log('Error');
      alert("ERroprjkdjkds")
    })
  }


  // STart quiz function

  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start the Quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info',
      }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
