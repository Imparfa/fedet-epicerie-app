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
  private apiUrl = 'http://fedet.truttmann.fr:8080/management';

  constructor(private http: HttpClient) {
  }

  getStats(selectedDistribution?: string, selectedMonth?: string, selectedYear?: string, startDate?: string, endDate?: string): Observable<Stats> {
    let queryParams: string[] = [];

    if ((startDate != '' || endDate != '') && (selectedYear != '' || selectedMonth != '')) {
      console.error("Conflit de paramètres : utilisez soit startDate/endDate, soit year/month, mais pas les deux.");
      return this.http.get<Stats>(`${this.apiUrl}/stats`);
    }

    if (selectedDistribution && selectedDistribution != '') {
      queryParams.push(`distributionId=${encodeURIComponent(selectedDistribution)}`);
    }

    if (startDate && startDate != '' && endDate && endDate != '') {
      queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
      queryParams.push(`endDate=${encodeURIComponent(endDate)}`);
    } else if (selectedYear && selectedYear != '' && selectedMonth && selectedMonth != '') {
      queryParams.push(`year=${encodeURIComponent(selectedYear)}`);
      queryParams.push(`month=${encodeURIComponent(selectedMonth)}`);
    } else if (selectedYear && selectedYear != '') {
      queryParams.push(`year=${encodeURIComponent(selectedYear)}`);
    } else if (selectedMonth && selectedMonth != '') {
      queryParams.push(`month=${encodeURIComponent(selectedMonth)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const url = `${this.apiUrl}/stats${queryString}`;

    return this.http.get<Stats>(url).pipe(
      tap((response) => {
        console.log("DEBUG_INFO: Received response for Stats request: ", JSON.stringify(response));
      })
    );
  }

  getDistributions(): Observable<Distribution[]> {
    return this.http.get<Distribution[]>(`${this.apiUrl}/distributions`).pipe(
      tap((response) => {
        console.log("DEBUG_INFO: Received response for Distributions request: ", JSON.stringify(response));
      })
    );
  }

  createDistribution(distribution: Partial<Distribution>): Observable<Distribution> {
    return this.http.post<Distribution>(`${this.apiUrl}/distributions`, distribution);
  }

  updateDistribution(id: string, data: Partial<Distribution>): Observable<Distribution> {
    console.log('DEBUG_INFO: Request Distribution Update for: ', JSON.stringify(data));
    return this.http.patch<Distribution>(`${this.apiUrl}/distributions/${id}`, data)
      .pipe(
      tap((response) => {
        console.log('DEBUG_INFO: Received response for Distribution Update request: ', JSON.stringify(response));
      })
    );
  }

  deleteDistribution(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/distributions/${id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getStudentsPaginated(page: number, size: number, search: string = '') {
    console.log('DEBUG_INFO: Request Students Paginated with: ', page, ' with size ', size, ' and searched: ', search);
    return this.http.get<Student[]>(`${this.apiUrl}/students`, {
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
    let queryParams: string[] = [];
    if (email) {
      queryParams.push(`email=${encodeURIComponent(email)}`);
    }
    if (startDate && endDate) {
      queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
      queryParams.push(`endDate=${encodeURIComponent(endDate)}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const url = `${this.apiUrl}/visits${queryString}`;

    console.log("DEBUG_INFO: Request Visit listing ->", url);
    return this.http.get<Visit[]>(url).pipe(
      tap((response) => {
        console.log("DEBUG_INFO: Received response for Visit listing request: ", JSON.stringify(response));
      })
    );
  }
}
