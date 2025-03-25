import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/student';
import {IonicModule, IonModal} from '@ionic/angular';
import {EditProfileModalComponent} from '../../../components/student/edit-profile-modal/edit-profile-modal.component';
import {DatePipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonicModule,
    DatePipe,
    EditProfileModalComponent,
    NgIf
  ]
})
export class ProfilePage implements OnInit {
  @ViewChild("editProfileModal") editProfileModal: IonModal | undefined;
  student: Student | null = null;

  constructor(private studentService: StudentService, private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.studentService.getStudent().subscribe(student => {
      this.student = student;
    });

    this.studentService.fetchStudent();
  }

  getAge(): number {
    if (!this.student?.birthdate) return 0;
    const birthDate = new Date(this.student.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
