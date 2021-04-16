import { Component, OnInit } from '@angular/core';
import { IntermediaryModels } from 'src/app/models/intermediary.models';
import { IntermediaryService } from '../../services/intermediary/intermediary.service';
import { ToastEnums } from '../../enums/toast.enums';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  toastsData: IntermediaryModels.Toast[] = [];

  constructor(
    private intermediaryService: IntermediaryService
  ) { }

  ngOnInit(): void {
    this.startListeners();
  }

  private startListeners() {
    this.intermediaryService.toastSubject.subscribe(toastData => {
      toastData = this.prepareToastData(toastData);
      this.toastsData.push(toastData);
      setTimeout(() => this.removeToast(toastData), toastData.duration || 3000);
    });
  }

  private prepareToastData(toastData: IntermediaryModels.Toast) {
    toastData.header = toastData.header || ToastEnums.Headers[toastData.type];
    toastData.class = toastData.class || ToastEnums.Classes[toastData.type];
    return toastData;

  }

  private removeToast(toastData: IntermediaryModels.Toast) {
    this.toastsData = this.toastsData.filter(_toastData => _toastData != toastData);
  }

}
