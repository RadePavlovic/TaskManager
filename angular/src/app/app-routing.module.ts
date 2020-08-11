import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingupPageComponent } from './pages/singup-page/singup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo:'lists',
    pathMatch:'full'
  },
  {
    path:'new-list',component:NewListComponent
  },
  {
    path:'lists/:listId/edit',
    component:EditListComponent
  },
  {
    path:'lists',
    component:TaskViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'lists/:listId',
    component:TaskViewComponent
  },
  {
    path:'lists/:listId/new-task',
    component:NewTaskComponent
  },
  {
    path:'lists/:listId/task/:taskId',
    component:EditTaskComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'signup',
    component:SingupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
