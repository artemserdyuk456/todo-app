import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TodoItemsResolverService} from '../../core/resolvers/todo-items.resolver.service';

import { TodoItemsComponent } from './todo-items.component';

const todoItemsRoutes: Routes = [
  {path: '', component: TodoItemsComponent, resolve: {server: TodoItemsResolverService}},
  {path: 'active', component: TodoItemsComponent, data: {complete: false}, resolve: {server: TodoItemsResolverService}},
  {path: 'completed', component: TodoItemsComponent, data: {complete: true}, resolve: {server: TodoItemsResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(todoItemsRoutes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule {
}
