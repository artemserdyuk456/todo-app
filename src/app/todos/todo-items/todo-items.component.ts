import { Component, OnInit } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems: TodoItems[];
  data: any;

  constructor(private todoItemsService: TodoItemsService,
              private route: ActivatedRoute ) {
    this.data = route.snapshot.data.title;
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
    this.data = this.route.snapshot.data.value;
    console.log(this.route.snapshot.data.value);
    // this.route.snapshot.data

  }
}
