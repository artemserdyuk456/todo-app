import {Component} from '@angular/core';

import {TodoItems} from '../../core/models/todo-items';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItems = new TodoItems();
  clearValue = '';

  constructor(private todoItemService: TodoItemsService) {}

  addTodoItem(value: string) {
    if (value) {
      this.newTodoItem.title = value;
      this.newTodoItem.id = Math.floor((Math.random() * 1000));
      console.log(this.newTodoItem.id);
      this.todoItemService.addTodoItem(this.newTodoItem);
      this.clearValue = '';
    }
  }

  getAllItems() {
    this.todoItemService.fetchTodoItems();
  }

}
