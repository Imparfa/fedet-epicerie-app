import {Injectable} from '@angular/core';
import {Student} from "../models/student";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";
import {Distribution} from "../models/distribution";

@Injectable({
  providedIn: 'root'
})
export class CollectService {
  isSupported = false;
  isOpen = false;
  selectedDistribution: Distribution | null = null;

  private apiUrl = 'http://fedet.truttmann.fr:8080';

  constructor(private http: HttpClient) {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  scanStudent(qrCode: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/collect/scan?qrCode=` + qrCode);
  }

  validateVisit(data: {
    studentId: string;
    distributionId: string;
    paymentMethod: 'CASH' | 'CARD';
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/collect/validate`, data);
  }
}
