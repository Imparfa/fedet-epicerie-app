import {Injectable} from '@angular/core';
import {Platform, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  toast: HTMLIonToastElement | null = null;

  constructor(private toastCtrl: ToastController, private platform: Platform) {
  }

  isPlatform(targetPlatform: "ipad" | "iphone" | "ios" | "android" | "phablet" | "tablet" | "cordova" | "capacitor" | "electron" | "pwa" | "mobile" | "mobileweb" | "desktop" | "hybrid") {
    return this.platform.is(targetPlatform)
  }

  async showToast(message: string, color: string, icon: string) {
    const toastSettings = {
      message,
      duration: 1500,
      color,
      icon,
      positionAnchor: 'anchor'
    }
    if (this.toast) {
      await this.toast.dismiss().then(async () => {
          this.toast = await this.toastCtrl.create({
            ...toastSettings,
            position: 'top',
          });
        }
      );
    } else {
      this.toast = await this.toastCtrl.create({
        ...toastSettings,
        position: 'top',
      });
    }
    await this.toast.present();
  }
}
