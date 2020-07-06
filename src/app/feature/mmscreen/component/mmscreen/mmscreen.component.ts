import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mmscreen',
  templateUrl: './mmscreen.component.html',
  styleUrls: ['./mmscreen.component.scss'],
})
export class MmscreenComponent implements OnInit {
  public showModal: boolean = false;

  constructor() {}

  public ngOnInit() {}

  public closeModal(event: MouseEvent) {
    this.showModal = false;
  }

  public overlayClick(event: MouseEvent) {
    const clickedElementClass = (<HTMLElement>event.target).className;
    if (clickedElementClass === 'modal') {
      this.closeModal(event);
    }
  }

  public displayModal(event: MouseEvent) {
    this.showModal = true;
    event.preventDefault();
  }
}
