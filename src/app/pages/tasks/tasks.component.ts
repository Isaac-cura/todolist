import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.models';
import { IntermediaryService } from 'src/app/services/intermediary/intermediary.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(8)]]
  });
  taskCache: Task;
  tasks$ = this.taskService.taskSubject;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private intermediaryService: IntermediaryService
  ) { }

  ngOnInit(): void {

  }

  deleteTask(task: Task) {
    this.intermediaryService.showConfirmation("¿Desea eliminar esta tarea?").subscribe(() => {
      this.taskService.delete(task);
      this.intermediaryService.showErrorToast("La tarea ha sido eliminada")
    });
  }

  createTask(name: string) {
    this.taskService.post(name);
    this.intermediaryService.showSuccedToast("Tarea creada con éxito");
    this.resetForm();
  }

  markTaskAsEditing(task: Task) {
    task.editing = task.name;
  }

  acceptChanges(task: Task) {
    if(!this.validateLenght(task.name)) {
      return this.intermediaryService.showErrorToast("La tarea debe tener como mínimo 8 caracteres");
    }
    delete task.editing;
    this.taskService.update(task);
    this.intermediaryService.showSuccedToast("La tarea ha sido modificada con éxito")
  }

  cancelChanges(task: Task) {
    task.name = task.editing;
    delete task.editing;
  }
  
  private validateLenght(name: string = "") {
    return name.length >= 8;
  }
  private resetForm() {
    this.taskForm.get("name").patchValue("", {emitEvent: false})
  }

  clearAll() {
    this.taskService.clearAll();
    this.intermediaryService.showErrorToast("Todas las tareas han sido eliminadas");
  }
 
}
