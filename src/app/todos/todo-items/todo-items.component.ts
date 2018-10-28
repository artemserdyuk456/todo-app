import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {concat, merge, Observable} from 'rxjs';
import {map, switchAll, withLatestFrom} from 'rxjs/operators';

import {TodoItems} from '../../core/models/todo-items';
import {TodoItemsService} from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  todoItems$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.todoItemsService.fetchTodoItems();
    // this.route.data
    //   .subscribe(
    //     (data: Data) => {
    //       console.log(data.complete);
    //     }
    //   );


    // switchAll().pipe(
    //   map(
    //     (data1) => {
    //
    //       console.log(data1);
    //       // console.log(data2);
    //     }
    //   )
    // ).subscribe();


    this.todoItems$ = this.todoItemsService.todoItems$
      .pipe(
        withLatestFrom(this.route.data),
        map(
          (([items, complete]) => {
              return items.filter(
                item => complete['complete'] === undefined || complete['complete'] === item.complete
              );
            }
          )
        )
      );

    // this.todoItems$ = this.todoItemsService.todoItems$
    //   .pipe(
    //     withLatestFrom(this.route.data),
    //     map(
    //       (([items, complete]) => {
    //             return items.filter(
    //               item => complete['complete'] === undefined || complete['complete'] === item.complete
    //             );
    //         }
    //       )
    //     )
    //   );

  }

  changeTodoItemComplete(itemId: number) {
    this.todoItemsService.toggleTodoItemComplete(itemId);
  }

  deleteTodoItemById(itemId: number) {
    this.todoItemsService.deleteTodoItemById(itemId);
  }


}
