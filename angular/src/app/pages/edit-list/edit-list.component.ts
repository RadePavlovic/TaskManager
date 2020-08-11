import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  
  listId:string;
  title:string='';

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.listId = params.listId
      console.log(params.listId);
      this.taskService.getList(this.listId).subscribe((task:Task)=> {
        this.title = task.title
      });
      
    })
  }

  editList() {
    this.taskService.editList(this.title,this.listId).subscribe(x=> {
      console.log(x);
      
    })
    this.router.navigateByUrl('/lists')
  }

}
