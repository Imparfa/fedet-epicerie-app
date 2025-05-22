import {Component, ViewChild} from '@angular/core';
import {IonicModule, IonModal, ViewWillEnter} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Student} from "../../../models/student";
import {ManagementService} from "../../../services/management.service";
import {EditProfileModalComponent} from "../../../components/student/edit-profile-modal/edit-profile-modal.component";
import {RegisterModalComponent} from "../../../components/authentication/register-modal/register-modal.component";
import {AuthenticationService} from "../../../services/authentication.service";
import {DeviceService} from "../../../services/device.service";
import {ViewProfileModalComponent} from "../../../components/admin/view-profile-modal/view-profile-modal.component";

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf,
    NgIf,
    EditProfileModalComponent,
    RegisterModalComponent,
    ViewProfileModalComponent
  ]
})
export class StudentsPage implements ViewWillEnter {
  @ViewChild("registerStudentModal") registerStudentModal: IonModal | undefined;
  @ViewChild("viewStudentModal") viewStudentModal: IonModal | undefined;
  @ViewChild("editStudentModal") editStudentModal: IonModal | undefined;
  students: Student[] = [];
  selectedStudent: Student | null = null;
  page = 0;
  pageSize = 9;
  loading = false;
  allLoaded = false;
  searchQuery: string = '';

  constructor(private managementService: ManagementService, private authService: AuthenticationService, private deviceService: DeviceService) {
  }

  ionViewWillEnter() {
    this.loadMoreStudents();
  }

  loadMoreStudents(event?: any) {
    if (this.loading || this.allLoaded) return;

    this.loading = true;

    this.managementService.getStudentsPaginated(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (data) => {
        if (data.length < this.pageSize) {
          this.allLoaded = true;
        }
        this.students.push(...data);
        this.page++;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  onSearchChange() {
    this.page = 0;
    this.students = [];
    this.allLoaded = false;
    this.loadMoreStudents();
  }

  filterStudents(): Student[] {
    const query = this.searchQuery.toLowerCase();
    return this.students.filter(student =>
      `${student.firstname} ${student.lastname}`.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  }

  viewStudent(student: Student) {
    this.selectedStudent = student;
    this.viewStudentModal?.present();
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.editStudentModal?.present();
  }

  createStudent() {
    this.selectedStudent = null;
    this.registerStudentModal?.present();
  }

  registerStudent(registerData: any) {
    if (!registerData.formation) {
      registerData.formation = "AUTRE";
    }
    if (!registerData.graduation) {
      registerData.graduation = "BAC";
    }
    this.authService.register(registerData)
      .subscribe({
        next: () => {
          this.deviceService.showToast('Étudiant créer avec succé', 'success', 'checkmark-circle');
          this.registerStudentModal?.dismiss(null, 'confirm');
        },
        error: () => this.deviceService.showToast('Erreur: Étudiant non créer', 'danger', 'alert-circle'),
      });
  }
}
