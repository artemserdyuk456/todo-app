import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {TodoItemsRoutingModule} from './todo-items-routing.module';
import { TodoItemsComponent } from './todo-items.component';
import {FilterTodoItemsPipe} from "./filter-todo-items.pipe";

@NgModule({
  imports: [
    CommonModule,
    TodoItemsRoutingModule
  ],
  declarations: [
    TodoItemsComponent,
    FilterTodoItemsPipe
  ],
  exports: [TodoItemsComponent]
})
export class TodoItemsModule { }
