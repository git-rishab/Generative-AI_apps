import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly TODOS_STORAGE_KEY = 'todos';
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  private saveTodosToLocalStorage(): void {
    localStorage.setItem(this.TODOS_STORAGE_KEY, JSON.stringify(this.todos));
  }

  private loadTodosFromLocalStorage(): void {
    const storedTodos = localStorage.getItem(this.TODOS_STORAGE_KEY);
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    this.todosSubject.next([...this.todos]);
  }

  createTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveTodosToLocalStorage();
    this.todosSubject.next([...this.todos]);
  }

  updateTodoStatus(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodosToLocalStorage();
    this.todosSubject.next([...this.todos]);
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveTodosToLocalStorage();
      this.todosSubject.next([...this.todos]);
    }
  }

  initializeTodosFromLocalStorage(): void {
    this.loadTodosFromLocalStorage();
  }
}
