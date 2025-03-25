import {Component, Input} from '@angular/core';
import {Student} from '../../../models/student';
import {StudentService} from '../../../services/student.service';
import {IonicModule, IonModal} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {ManagementService} from "../../../services/management.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ]
})
export class EditProfileModalComponent {
  @Input() editProfileModal: IonModal | undefined;
  @Input() student: Student | null = null;
  @Input() role: string = "UNDEFINED"
  updatedStudent: Partial<Student> = {};

  constructor(private studentService: StudentService, private managementService: ManagementService) {
  }

  saveChanges() {
    if (this.student) {
      if (this.role === "STUDENT") {
        this.studentService.updateStudent(this.updatedStudent).subscribe(() => {
          this.editProfileModal?.dismiss(this.updatedStudent, 'submit').then();
        });
      } else if (this.role === "ADMIN") {
        this.managementService.updateStudent(this.student.email, this.updatedStudent).subscribe(() => {
          this.editProfileModal?.dismiss(this.updatedStudent, 'submit').then();
        });
      }
    }
  }

  cancel() {
    this.editProfileModal?.dismiss(null, 'cancel').then();
  }
}
