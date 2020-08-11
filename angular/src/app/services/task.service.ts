import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service'; 
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService:WebRequestService) { }

  createTask(title:string,listId:string) {
    return this.webReqService.post(`lists/${listId}/tasks`,{title})
  }
  createList(title: string) {
    return this.webReqService.post('lists',{title})
  }
  getLists(){
    return this.webReqService.get('lists')
  }
  getList(listId:string) {
    return this.webReqService.get(`lists/${listId}`)
  }
  getTasks(listId:string){
    return this.webReqService.get('lists/' + listId + '/tasks')
  }
  getTask(listId:string,taskId:string) { 
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`)
  }
  complete(task:Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{completed:!task.completed})
  }
  deleteList(listId:string) {
    return this.webReqService.delete('lists/' +listId)
  }
  editList(title:string,listId:string) {
    return this.webReqService.patch(`lists/` + listId,{title})
  }
  deleteTask(listId:string,id:string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${id}`) 
  }
  editTask(listId:string,taskId:string,title:string) {
  return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,{title})
  }
  getEmailFromStorage() {
    return localStorage.getItem('email')
  }
 
}
