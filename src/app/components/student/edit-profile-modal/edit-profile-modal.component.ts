import { Component, Input } from '@angular/core';
import { Student } from '../../../models/student/student';
import { StudentService } from '../../../services/student.service';
import {IonicModule, IonModal} from '@ionic/angular';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class EditProfileModalComponent {
  @Input() editProfileModal: IonModal | undefined;
  @Input() student: Student | null = null;
  updatedStudent: Partial<Student> = {};

  constructor(private studentService: StudentService) {}

  saveChanges() {
    if (this.student) {
      this.studentService.updateStudent(this.updatedStudent).subscribe(() => {
        this.editProfileModal?.dismiss(null, 'submit').then();
      });
    }
  }

  cancel() {
    this.editProfileModal?.dismiss(null, 'cancel').then();
  }
}
