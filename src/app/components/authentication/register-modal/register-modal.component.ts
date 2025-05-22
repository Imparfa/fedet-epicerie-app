import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Formation} from "../../../models/formation";
import {Graduation} from "../../../models/graduation";
import {Student} from "../../../models/student";
import {StudentService} from "../../../services/student.service";
import {DeviceService} from "../../../services/device.service";

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
  @Input() switchFunction: Function | undefined;
  @Input() isAdminRegistration: boolean | undefined;

  registerStudent: Partial<Student> = {};
  registerStep: number = 0 // 0: identity, 1: personal information, 2: credential;
  confirmPassword: string = '';
  calendar: string = this.studentService.formatISODate(new Date(Date.now()));

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(protected studentService: StudentService, protected deviceService: DeviceService) {
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
      !this.registerStudent.password || !this.confirmPassword || !this.registerStudent.birthdate ||
      !this.registerStudent.household || this.registerStudent.household < 1 || this.registerStudent.household > 10) {
      this.deviceService.showToast("Tous les champs doivent être remplis correctement.", "danger", "alert-circle");
      return false;
    }

    if (this.registerStudent.password !== this.confirmPassword) {
      this.deviceService.showToast("Les mots de passe ne correspondent pas.", "danger", "alert-circle");
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

  switchMode(target: 'login' | 'register') {
    if (this.switchFunction) {
      this.switchFunction(target);
    }
  }

  isStep(step: number): boolean {
    return this.registerStep === step;
  }

  nextStep() {
    if (this.registerStep == 1 && (!this.registerStudent.household || this.registerStudent.household < 1 ||
      this.registerStudent.household > 10)) {
      this.deviceService.showToast("La population du foyé doit être compris entre 1 et 10.", "danger", "alert-circle");
      return;
    }

    if (this.registerStep <= 4) {
      this.registerStep++;
      if (this.registerStep === 3 && !this.registerStudent.isStudent)
        this.registerStep++;
    }
  }

  previousStep() {
    if (this.registerStep >= 1) {
      this.registerStep--;
      if (this.registerStep === 3 && !this.registerStudent.isStudent)
        this.registerStep--;
    }
  }

  protected readonly Formation = Formation;
  protected readonly Graduation = Graduation;
}
