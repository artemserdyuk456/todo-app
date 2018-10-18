import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosComponent } from './todos.component';
import {TODO_ITEMS} from '../core/mock/mock-todo-items';


const todosRoutes: Routes = [
  { path: '', component: TodosComponent, children: [
      { path: '', loadChildren: './todo-items/todo-items.module#TodoItemsModule', data: {value: TODO_ITEMS }},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
