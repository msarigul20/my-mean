import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class Alert{
  visible = true;
  @Input() pAlertMode: string;

  closeAlert() {
    this.visible = false;
  }
}
