import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  public appTabs: any[] = [];

  constructor(private authService: AuthenticationService, private router: Router) {}

  async ngOnInit() {
    const role = await this.authService.getRole();
    if (role === 'ADMIN') {
      this.appTabs = [
        { title: 'Dashboard', url: '/tabs/admin/dashboard', icon: 'stats-chart' },
        // { title: 'Register', url: '/tabs/admin/register', icon: 'cash' },
        // { title: 'Students', url: '/tabs/admin/students', icon: 'people' }
      ];
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
