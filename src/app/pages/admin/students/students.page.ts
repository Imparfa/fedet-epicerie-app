import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Student} from "../../../models/student";
import {ManagementService} from "../../../services/management.service";
import {EditProfileModalComponent} from "../../../components/student/edit-profile-modal/edit-profile-modal.component";

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf,
    EditProfileModalComponent
  ]
})
export class StudentsPage implements OnInit {
  @ViewChild("editStudentModal") editStudentModal: IonModal | undefined;
  students: Student[] = [];
  selectedStudent: Student | null = null;
  searchQuery: string = '';

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.managementService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err),
    });
  }

  filterStudents(): Student[] {
    const query = this.searchQuery.toLowerCase();
    return this.students.filter(student =>
      `${student.firstname} ${student.lastname}`.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.editStudentModal?.present();
  }
}
