import {Injectable} from '@angular/core';
import {Student} from "../models/student";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Visit} from "../models/visit";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private apiUrl = 'https://fedet.truttmann.fr';

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/management/students`);
  }

  updateStudent(email: string, updatedStudent: Partial<Student>): Observable<Student> {
    console.log('DEBUG_INFO: Request student profile modification for: ', JSON.stringify(updatedStudent));
    return this.http.patch<Student>(this.apiUrl + '/student/profile?email=' + email, updatedStudent);
  }

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}/management/visits`);
  }
}
