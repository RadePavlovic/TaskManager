import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model'; 
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  listId: string = "";
  email: string = "";
  params:boolean=false;

  constructor(private taskService: TaskService, private route: ActivatedRoute,private router:Router,private authService:AuthService,private toaster:ToastrService) { }

  ngOnInit() { 
    this.taskService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    })
    this.route.params.subscribe((params) => {
      if (params.listId) { 
        this.listId = params.listId
        this.taskService.getTasks(params.listId).subscribe((tasks: any[]) => {
          this.tasks = tasks
        })
      }else {
        this.tasks = [];
      }
    })

   
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed Successfully");
      task.completed = !task.completed;
    })
  }
  
  onDeleteList() {
    this.taskService.deleteList(this.listId).subscribe(lists => {
      console.log(lists); 
    })
    this.router.navigateByUrl('/lists')
  }

  onDeleteTask(id:string) {
    this.tasks= this.tasks.filter(list =>list._id !== id)
    this.taskService.deleteTask(this.listId,id).subscribe(val => 
      console.log("TASK DELETED")
      )
     
  }

}
