import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
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
    EditProfileModalComponent,
    NgIf
  ]
})
export class StudentsPage implements OnInit {
  @ViewChild("editStudentModal") editStudentModal: IonModal | undefined;
  students: Student[] = [];
  selectedStudent: Student | null = null;
  page = 0;
  pageSize = 9;
  loading = false;
  allLoaded = false;
  searchQuery: string = '';

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
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
