import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;
  isPassed = false; // Added variable to determine pass or fail

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data: any) => {
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      this.startTimer();
    }, (error) => {
      console.log("Error");
      Swal.fire("Error", 'Error in loading questions of the quiz', 'error');
    });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then(() => {
      this.evalQuiz();
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;
    return `${minutes} Minutes:${seconds} Seconds`;
  }

  evalQuiz() {
    // All Calculation for quiz

    // Put all the data for evaluating all data on the server
    this._question.evalQuiz(this.questions).subscribe((data: any) => {
      console.log('Data from Server ', data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer = data.correctAnswer;
      this.attempted = data.attempted;
      this.isSubmit = true;

      // Check if the user's score is greater than or equal to 50%
      if (this.marksGot  >= 50) {
        this.isPassed = true;
      } else {
        this.isPassed = false;
      }

    }, (error) => {
      console.log("Error ", error);
    });
  }

  printPage() {
    window.print();
  }
}
