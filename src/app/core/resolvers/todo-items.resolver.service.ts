import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {TodoItems} from '../models/todo-items';
import {TodoItemsService} from '../services/todo-items.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsResolverService implements Resolve<void> {
  constructor(
    private todoItemsService: TodoItemsService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    return this.todoItemsService.fetchTodoItems();
  }
}
