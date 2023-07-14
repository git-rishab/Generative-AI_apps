import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.initializeTodosFromLocalStorage();
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  markComplete(todo: Todo): void {
    this.todoService.updateTodoStatus(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }
}
