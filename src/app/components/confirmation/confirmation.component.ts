import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Input() title;
  @Input() message;
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal(confirm: boolean = false) {
    this.modal.close(confirm); 
  }

}
