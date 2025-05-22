import {Component, Input} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {DeviceService} from "../../../services/device.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ]
})
export class LoginModalComponent {

  @Input() loginModal: IonModal | undefined;
  @Input() loginFunction: Function | undefined;
  @Input() switchFunction: Function | undefined;
  credentials = { email: '', password: '' };
  showPassword = false;

  constructor(protected deviceService: DeviceService) {
  }

  login() {
    if (this.loginFunction) {
      this.loginFunction(this.credentials);
    }
  }

  cancel() {
    this.loginModal?.dismiss(null, 'cancel').then();
  }

  switchMode(target: 'login' | 'register') {
    if (this.switchFunction) {
      this.switchFunction(target);
    }
  }
}
