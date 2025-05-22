import {Component, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {LoginModalComponent} from "../../components/authentication/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../components/authentication/register-modal/register-modal.component";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  imports: [
    IonicModule,
    LoginModalComponent,
    RegisterModalComponent
  ],
  styleUrls: ['./authentication.page.scss']
})
export class AuthenticationPage {
  @ViewChild("loginModal") loginModal: IonModal | undefined;
  @ViewChild("registerModal") registerModal: IonModal | undefined;

  constructor(private authService: AuthenticationService, private router: Router, private deviceService: DeviceService) {
  }

  login(credentials: { email: string, password: string }) {
    this.authService.login(credentials).subscribe({
      next: async () => {
        this.loginModal?.dismiss(null, 'confirm');
        console.log("Redirection...")
      },
      error: err => {
        console.error('Échec de la connexion:', err);
        this.deviceService.showToast("Identifiants incorrects, veuillez réessayer.", "danger", "alert-circle");
      }
    });
  }

  register(registerData: any) {
    if (!registerData.formation) {
      registerData.formation = "AUTRE";
    }
    if (!registerData.graduation) {
      registerData.graduation = "BAC";
    }
    this.authService.register(registerData).subscribe({
      next: () => {
        this.registerModal?.dismiss(null, 'confirm');
        this.router.navigate(['/']).catch(error => console.error('Erreur de redirection:', error));
      },
      error: err => {
        console.error('Échec de l’inscription:', err);
        this.deviceService.showToast("Une erreur est survenue, veuillez réessayer.", "danger", "alert-circle");
      }
    });
  }

  switchMode(target: 'login' | 'register') {
    if (target === 'login') {
      this.registerModal?.dismiss(null, 'cancel').then(() => {
        this.loginModal?.present();
      });
    } else {
      this.loginModal?.dismiss(null, 'cancel').then(() => {
        this.registerModal?.present();
      });
    }
  }
}
