import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {StudentService} from '../../../services/student.service';
import {IonicModule, IonModal} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {ManagementService} from "../../../services/management.service";
import {NgForOf, NgIf} from "@angular/common";
import {Graduation} from "../../../models/graduation";
import {Formation} from "../../../models/formation";

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class EditProfileModalComponent implements OnInit {
  @Input() editProfileModal: IonModal | undefined;
  @Input() student: Student | null = null;
  @Input() role: string = "UNDEFINED"

  updatedStudent: Partial<Student> = {};
  calendar: string = this.studentService.formatISODate(new Date(Date.now()));
  confirmPassword: string = '';

  constructor(protected studentService: StudentService, private managementService: ManagementService) {
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

  doneCalendar() {
    if (this.updatedStudent)
      this.updatedStudent.birthdate = this.studentService.formatISODate(new Date(this.calendar));
  }

  protected readonly Graduation = Graduation;
  protected readonly Formation = Formation;

  ngOnInit(): void {
    this.updatedStudent.firstname = this.student?.firstname;
    this.updatedStudent.lastname = this.student?.lastname;
    this.updatedStudent.birthdate = this.student?.birthdate;
    this.updatedStudent.email = this.student?.email;
    this.updatedStudent.formation = this.student?.formation;
    this.updatedStudent.graduation = this.student?.graduation;
    this.updatedStudent.isStudent = this.student?.isStudent;
    this.updatedStudent.isWorker = this.student?.isWorker;
    this.updatedStudent.household = this.student?.household;
  }
}
