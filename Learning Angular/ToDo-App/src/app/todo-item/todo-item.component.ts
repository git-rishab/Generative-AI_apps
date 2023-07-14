import { Component, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo);
  }

  markComplete(): void {
    this.todoService.updateTodoStatus(this.todo);
  }
  
}
