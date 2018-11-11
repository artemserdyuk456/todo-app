import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map, tap} from 'rxjs/operators';

import {TodoItems} from '../../core/models/todo-items';
import {TodoItemsService} from '../../core/services/todo-items.service';

import * as   todoItemsAction from './todo-items.actions';

export interface TodoItemsStateModel {
  todoItems: {
    [id: number]: TodoItems
  };
  todoItemsIds: number[];
}


@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    todoItems: {},
    todoItemsIds: []
  }
})

export class TodoItemsState {
  @Selector()
  static getTodoItems(state: TodoItemsStateModel) {
    return state.todoItemsIds.map(id => state.todoItems[id]);
  }

  constructor(private todoItemsService: TodoItemsService) {
  }

  @Action(todoItemsAction.FetchTodoItems)
  fetchTodoItems(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>
  ) {
    return this.todoItemsService.fetchTodoItems()
      .pipe(
        tap(
          items => dispatch(new todoItemsAction.FetchTodoItemSuccessfully(items))
        ),
        catchError(
          error => dispatch(new todoItemsAction.FetchTodoItemFailed(error))
        )
      );
  }

  @Action(todoItemsAction.FetchTodoItemSuccessfully)
  fetchTodoItemSuccessfully(
    {patchState}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.FetchTodoItemSuccessfully
  ) {
    patchState(
      {
        todoItems: payload.reduce((items, currentItem) => ({
          ...items,
          [currentItem.id]: currentItem
        }), {}),
        todoItemsIds: payload.map(item => item.id)
      }
    );
  }

  @Action(todoItemsAction.FetchTodoItemFailed)
  fetchTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    dispatch({loaded: false, loading: false});
  }


  @Action(todoItemsAction.AddTodoItem)
  addTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.AddTodoItem
  ) {
    return this.todoItemsService.addTodoItem(payload)
      .pipe(
        tap(
          items => dispatch(new todoItemsAction.AddTodoItemSuccessfully(items))
        ),
        catchError(
          error => dispatch(new todoItemsAction.AddTodoItemFailed(error))
        )
      );
  }

  @Action(todoItemsAction.AddTodoItemSuccessfully)
  addTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsAction.AddTodoItemSuccessfully
  ) {
    const state = getState().todoItems;
    patchState(
      {
        todoItems: [todoItem].reduce((item, currentItem) => ({
          ...item,
          [currentItem.id]: currentItem
        }), state),
        todoItemsIds: getState().todoItemsIds.concat(todoItem.id)
      }
    );
  }

  @Action(todoItemsAction.AddTodoItemFailed)
  addTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
  }


  @Action(todoItemsAction.DeleteTodoItem)
  deleteTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.DeleteTodoItem
  ) {
    return this.todoItemsService.deleteTodoItemById(payload)
      .pipe(
        tap(
          () => dispatch(new todoItemsAction.DeleteTodoItemSuccessfully(payload))
        ),
        catchError(
          error => dispatch(new todoItemsAction.DeleteTodoItemFailed(error))
        )
      );
  }

  @Action(todoItemsAction.DeleteTodoItemSuccessfully)
  deleteTodoItemSuccessfully(
    {getState, patchState, setState}: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsAction.DeleteTodoItemSuccessfully
  ) {
    patchState(
      {
        todoItemsIds: getState().todoItemsIds.filter(itemId => itemId !== id)
      }
    );
  }

  @Action(todoItemsAction.DeleteTodoItemFailed)
  deleteTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
  }


  @Action(todoItemsAction.ToggleTodoItemsComplete)
  toggleTodoItemsComplete(
    {patchState, dispatch, getState}: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsAction.ToggleTodoItemsComplete
  ) {
    const todoItem = getState().todoItems[id];
    console.log(getState().todoItems);
    todoItem.complete = !todoItem.complete;
    return this.todoItemsService.toggleTodoItemComplete(todoItem)
      .pipe(
        tap(
          items => dispatch(new todoItemsAction.ToggleTodoItemCompleteSuccessfully(items))
        ),
        catchError(
          error => dispatch(new todoItemsAction.ToggleTodoItemCompleteFailed(error))
        )
      );
  }

  @Action(todoItemsAction.ToggleTodoItemCompleteSuccessfully)
  toggleTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsAction.ToggleTodoItemCompleteSuccessfully
  ) {
    console.log(getState().todoItems[todoItem.id]);
    getState().todoItems[todoItem.id].complete = todoItem.complete;
    patchState(
      {
        // todoItems: getState().todoItems.map(
        //   item => {
        //     if (item.id === payload.id) {
        //       item.complete = payload.complete;
        //     }
        //     return item;
        //   }
        // ),

      }
    );
  }

  @Action(todoItemsAction.ToggleTodoItemCompleteFailed)
  toggleTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
  }


}
