// src/app/create-todo/create-todo.component.ts

import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  title: string = '';
  description: string = '';

  constructor(private todoService: TodoService) { }

  createTodo(): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      completed: false
    };

    this.todoService.createTodo(newTodo);
    this.title = '';
    this.description = '';
    console.log(newTodo);
  }
}
