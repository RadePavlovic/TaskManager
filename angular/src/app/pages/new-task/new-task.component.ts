import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId:string;

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.listId = params['listId']
    }) 
  }
  createNewTask(title:string) { 
   this.taskService.createTask(title,this.listId).subscribe(task => {
     this.router.navigate(['../'],{relativeTo:this.route})
     
   })
  }

}
