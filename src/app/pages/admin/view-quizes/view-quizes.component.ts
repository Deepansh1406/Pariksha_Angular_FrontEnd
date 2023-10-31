import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizes: any[] = []; // Here, you have used 'any[]' to define an array of any type.

  constructor(private _quiz: QuizServiceService) {}

  ngOnInit(): void {
    this._quiz.quizes().subscribe(
      (data: any) => { // Here, you have used 'any' as the type for the 'data' parameter.
        this.quizes = data;
        console.log(this.quizes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading Data', 'error');
      }
    );
  }

  // Delete Quiz

  deleteQuiz(qid: any) { // Here, you have used 'any' as the type for the 'qid' parameter.
    Swal.fire({
      icon: 'info',
      title: "Are You sure want to delete?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete that QUIZ
        this._quiz.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizes = this.quizes.filter((quiz) => quiz.qid !== qid);
            Swal.fire("Success!!", 'Quiz Deleted', "success")
          },
          (error) => {
            Swal.fire("Error!!", "Error in deleting Quiz", 'error');
          }
        );
      }
    });
  }
}
