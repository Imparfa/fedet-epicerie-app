import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Formation} from "../../../models/formation";
import {Graduation} from "../../../models/graduation";
import {Student} from "../../../models/student";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class RegisterModalComponent implements OnInit {

  @Input() registerModal: IonModal | undefined;
  @Input() registerFunction: Function | undefined;

  registerStudent: Partial<Student> = {};
  confirmPassword: string = '';
  calendar: string = this.studentService.formatISODate(new Date(Date.now()));

  errorMessage: string = '';

  constructor(protected studentService: StudentService) {
  }

  register() {
    if (!this.validateInputs()) {
      return;
    }
    if (this.registerFunction) {
      this.registerFunction(this.registerStudent);
    }
  }

  cancel() {
    this.registerModal?.dismiss(null, 'cancel').then();
  }

  validateInputs(): boolean {
    if (!this.registerStudent.firstname || !this.registerStudent.lastname || !this.registerStudent.email ||
      !this.registerStudent.password || !this.confirmPassword || !this.registerStudent.birthdate) {
      this.errorMessage = "Tous les champs doivent être remplis.";
      return false;
    }

    if (this.registerStudent.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return false;
    }

    return true;
  }

  doneCalendar() {
    if (this.registerStudent)
      this.registerStudent.birthdate = this.studentService.formatISODate(new Date(this.calendar));
  }

  ngOnInit(): void {
    this.registerStudent.birthdate = this.studentService.formatISODate(new Date(Date.now()));
  }

  protected readonly Formation = Formation;
  protected readonly Graduation = Graduation;
}
