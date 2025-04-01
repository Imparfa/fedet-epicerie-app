import {Student} from "./student";
import {Distribution} from "./distribution";

export interface Visit {
  paymentMethod: string;
  visitDate: string;
  distribution: Distribution;
  student: Student;
}
