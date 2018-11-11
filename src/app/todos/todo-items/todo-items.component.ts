import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {combineLatest, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import { DeleteTodoItem, ToggleTodoItemsComplete } from '../../ngxs/todos/todo-items.actions';
import {TodoItemsState} from '../../ngxs/todos/todo-items.state';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  @Select(TodoItemsState.getTodoItems) todoItems$: Observable<TodoItems[]>;
  todoItem$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
    private store: Store) {

  }

  ngOnInit() {
    this.todoItem$ = combineLatest(
        this.todoItems$,
        this.route.data
        .pipe(map(
          data => data.complete
        ))
      ).pipe(
      map(([items, complete]) => {
        console.log(items);
        return items.filter(
          (item: TodoItems) => complete === undefined || complete === item.complete
        );
      })
    );



  }

  changeTodoItemComplete(id: number) {
    this.store.dispatch(new ToggleTodoItemsComplete(id));
  }

  deleteTodoItemById(id: number) {
    this.store.dispatch(new DeleteTodoItem(id));
  }

}

