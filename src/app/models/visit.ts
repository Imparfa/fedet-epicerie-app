import {Student} from "./student";

export class Visit {

  student: Student;
  visitDate: string = "";
  location: string = "";
  paymentMethod: string = "";

  constructor(student: Student, visitDate: string, location: string, paymentMethod: string) {
    this.student = student;
    this.visitDate = visitDate;
    this.location = location;
    this.paymentMethod = paymentMethod;
  }
}
