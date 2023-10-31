import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  constructor(private _route:ActivatedRoute, private _question:QuestionService,private _router: Router){}
  public  Editor=ClassicEditor;
  qId=0;
  question :any;
  qTitle:any;

  ngOnInit(): void {

      this.qId=this._route.snapshot.params['qId'];
      
      this._question.getQuestion(this.qId).subscribe((data:any)=>{
        this.question=data;
        console.log(this.question);
        
      },
      (error)=>{
        console.log("Error",error);
        
      })
      
  }


  // update form submit
  public updateQuestion(){

this._question.updateQuestion(this.question).subscribe((data:any)=>{
  Swal.fire("Success!!",'Question Updated','success').then((e)=>{
    this._router.navigate(['/admin/quizes'])
  })

},
(error)=>{
  Swal.fire('Oops...','Error in updating Question!','error');
})

  }


}
