import {Component, Input} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Formation} from "../../../models/student/formation";
import {Graduation} from "../../../models/student/graduation";
import {Student} from "../../../models/student/student";

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
export class RegisterModalComponent {

  @Input() registerModal: IonModal | undefined;
  @Input() registerFunction: Function | undefined;

  registerStudent: Student = new Student('', '', this.formatISODate(new Date(Date.now())), Formation.MMI, Graduation["BAC+3"], 0, false, false, '', '' )

  confirmPassword: string = '';
  calendar: string = this.formatISODate(new Date(Date.now()));

  errorMessage: string = '';

  constructor() { }

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
      !this.registerStudent.password || !this.confirmPassword || !this.registerStudent.birthdate || !this.registerStudent.formation) {
      this.errorMessage = "Tous les champs doivent être remplis.";
      return false;
    }

    if (this.registerStudent.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return false;
    }

    return true;
  }

  formatISODate(date: Date): string {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  doneCalendar() {
    this.registerStudent.birthdate = this.formatISODate(new Date(this.calendar));
  }

  enumIterator(enumeration: any): Array<string> {
    return Object.keys(enumeration).filter(key => !isNaN(Number(enumeration[key])));
  }

  protected readonly Formation = Formation;
  protected readonly Graduation = Graduation;
}
