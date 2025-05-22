import {Injectable} from '@angular/core';
import {Student} from "../models/student";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Visit} from "../models/visit";
import {Distribution} from "../models/distribution";
import {Stats} from "../models/stats";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private apiUrl = 'https://fedet.truttmann.fr';

  constructor(private http: HttpClient) {
  }

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.apiUrl}/management/stats`).pipe(
      tap((response) => {
        console.log('DEBUG_INFO: Received response for Stats request: ', JSON.stringify(response));
      })
    );
  }

  getDistributions(): Observable<Distribution[]> {
    return this.http.get<Distribution[]>(`${this.apiUrl}/management/distributions`);
  }

  createDistribution(distribution: Partial<Distribution>): Observable<Distribution> {
    return this.http.post<Distribution>(`${this.apiUrl}/management/distributions`, distribution);
  }

  updateDistribution(id: string, data: Partial<Distribution>): Observable<Distribution> {
    console.log('DEBUG_INFO: Request Distribution Update for: ', JSON.stringify(data));
    return this.http.patch<Distribution>(`${this.apiUrl}/management/distributions/${id}`, data)
      .pipe(
      tap((response) => {
        console.log('DEBUG_INFO: Received response for Distribution Update request: ', JSON.stringify(response));
      })
    );
  }

  deleteDistribution(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/management/distributions/${id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/management/students`);
  }

  getStudentsPaginated(page: number, size: number, search: string = '') {
    console.log('DEBUG_INFO: Request Students Paginated with: ', page, ' with size ', size, ' and searched: ', search);
    return this.http.get<Student[]>(`${this.apiUrl}/management/students`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        ...(search && {search})
      }
    });
  }


  updateStudent(email: string, updatedStudent: Partial<Student>): Observable<Student> {
    console.log('DEBUG_INFO: Request student profile modification for: ', JSON.stringify(updatedStudent));
    return this.http.patch<Student>(this.apiUrl + '/student/profile?email=' + email, updatedStudent);
  }

  getVisits(email: string | null, startDate: string | null, endDate: string | null): Observable<Visit[]> {
    console.log('DEBUG_INFO: Request Visit listing for: Start=', startDate, ' End=', endDate, email ? ' for student: ' + email : '');
    return this.http.get<Visit[]>(`${this.apiUrl}/management/visits` + (email ? '?email=' + email : '') + (startDate && endDate ? ((email ? '&startDate=' : '?startDate=') + startDate + '&endDate=' + endDate) : '')).pipe(
      tap((response) => {
        console.log('DEBUG_INFO: Received response for Visit listing request: ', JSON.stringify(response));
      })
    );
  }
}
