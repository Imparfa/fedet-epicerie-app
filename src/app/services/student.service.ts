import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student | null>(null);
  public student$ = this.studentSubject.asObservable();
  private apiUrl = 'http://fedet.truttmann.fr:8080';

  constructor(private http: HttpClient) {}

  fetchStudent(): void {
    console.log('DEBUG_INFO: Request profile for the connected student by bearer');
    this.http.get<Student>(this.apiUrl + '/student/profile').subscribe(student => {
      this.studentSubject.next(student);
    });
  }

  getStudent(): Observable<Student | null> {
    return this.student$;
  }

  updateStudent(updatedStudent: Partial<Student>): Observable<Student> {
    console.log('DEBUG_INFO: Request student profile modification for: ', JSON.stringify(updatedStudent));
    return this.http.patch<Student>(this.apiUrl + '/student/profile', updatedStudent);
  }

  formatISODate(date: Date): string {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  enumIterator(enumeration: any): Array<string> {
    return Object.keys(enumeration).filter(key => !isNaN(Number(enumeration[key])));
  }
}
