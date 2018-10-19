import { Component, OnInit } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import {ActivatedRoute, Data} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems: TodoItems[];
  itemsSub: Subscription;
  data: any;

  constructor(private todoItemsService: TodoItemsService,
              private route: ActivatedRoute ) {
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
    this.data = this.route.snapshot.data.value;

    this.itemsSub = this.todoItemsService.getUpdateTodoItems()
      .subscribe((items: TodoItems[]) => {
        this.todoItems = items;
      });
  }

  deleteTodoItemById(id: number) {
    this.todoItemsService.deleteTodoItemById(id);
  }
}
