import {Graduation} from "./graduation";
import {Formation} from "./formation";

export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  household: number;
  formation: Formation;
  graduation: Graduation;
  isStudent: boolean;
  isWorker: boolean;
  createdAt: string;
  lastVisit: string;
  lastLocation: string;
  qrCode: string;
}
