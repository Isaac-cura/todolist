import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Task } from '../../models/task.models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  taskSubject: ReplaySubject<Task[]> = new ReplaySubject(1);
  tasks: Task[] = []

  constructor() { 
    this.taskSubject.next(this.tasks);
  }

  post(name:string) {
    this.tasks.push({
      name,
      id: new Date().getTime() + Math.floor(Math.random() * 10000)
    });
    this.taskSubject.next(this.tasks);
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(({id}) => id != task.id);
    this.taskSubject.next(this.tasks);
  }

  clearAll() {
    this.tasks = [];
    this.taskSubject.next(this.tasks);
  }

  update(task: Task) {
    const _task = this.tasks.find(({id}) => id == task.id);
    Object.assign(_task, task);
    this.taskSubject.next(this.tasks);
  }
}
