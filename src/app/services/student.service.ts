import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student | null>(null);
  public student$ = this.studentSubject.asObservable();
  private apiUrl = 'http://87.106.247.67:8080';

  constructor(private http: HttpClient) {}

  fetchStudent(): void {
    this.http.get<Student>(this.apiUrl + '/student/profile').subscribe(student => {
      this.studentSubject.next(student);
    });
  }

  getStudent(): Observable<Student | null> {
    return this.student$;
  }

  updateStudent(updatedStudent: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(this.apiUrl + '/student/profile', updatedStudent);
  }
}
