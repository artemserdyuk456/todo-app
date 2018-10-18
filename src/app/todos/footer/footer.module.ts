import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {TodosRoutingModule} from '../todos-routing.module';
import { FooterComponent } from './footer.component';
import {TodoItemsRoutingModule} from '../todo-items/todo-items-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule { }
