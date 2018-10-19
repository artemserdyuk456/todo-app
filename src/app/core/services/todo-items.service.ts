import { Injectable } from '@angular/core';

import { TODO_ITEMS } from '../mock/mock-todo-items';
import { TodoItems } from '../models/todo-items';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[] = TODO_ITEMS;
  updateTodoItems = new Subject<TodoItems[]>();

  deleteTodoItemById(id: number) {
    const updateTodoItems = this.todoItems.filter(item => item.id !== id);
    this.todoItems = updateTodoItems;
    this.updateTodoItems.next([...this.todoItems]);
  }

  getUpdateTodoItems() {
    return this.updateTodoItems.asObservable();
  }
}
