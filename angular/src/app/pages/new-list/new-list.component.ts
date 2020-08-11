import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit() {
  }

  createNewList(title?:string) {
    this.taskService.createList(title).subscribe((list:List) => {
      this.router.navigate(['/lists',list._id])      
    })
  }
}
