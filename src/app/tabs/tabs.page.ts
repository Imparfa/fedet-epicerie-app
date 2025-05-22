import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {ViewWillEnter} from "@ionic/angular";
import {DeviceService} from "../services/device.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements ViewWillEnter {
  public appTabs: any[] = [];

  constructor(protected authService: AuthenticationService, private router: Router, protected deviceService: DeviceService) {
  }

  async ionViewWillEnter() {
    if (!this.authService.isStudent) {
      this.appTabs = [
        {title: 'Accueil', url: '/tabs/admin/dashboard', icon: 'stats-chart'},
        {title: 'Distributions', url: '/tabs/admin/distributions', icon: 'business'},
      ];
      if (this.deviceService.isPlatform('mobile')) {
        this.appTabs.push({title: 'Caisse', url: '/tabs/admin/cash-register', icon: 'wallet'});
      }
      this.appTabs.push({title: 'Adhérants', url: '/tabs/admin/students', icon: 'people'},
        {title: 'Visites', url: '/tabs/admin/visits', icon: 'pricetags'})
    } else {
      this.appTabs = [
        { title: 'Profile', url: '/tabs/student/profile', icon: 'person' },
        // { title: 'Courses', url: '/tabs/student/courses', icon: 'book' },
        // { title: 'Notifications', url: '/tabs/student/notifications', icon: 'notifications' }
      ];
    }
    await this.router.navigate([this.appTabs[0].url]);
  }
}
