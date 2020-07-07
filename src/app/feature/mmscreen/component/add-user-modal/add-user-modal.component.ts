import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  @Output() public close: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {}

  public ngOnInit() {}

  public closeModal(event: MouseEvent) {
    this.close.emit(event);
  }
}
