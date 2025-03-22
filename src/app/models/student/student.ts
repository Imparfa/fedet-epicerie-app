import {Graduation} from "./graduation";
import {Formation} from "./formation";

export class Student {

  firstname: string;
  lastname: string;
  email: string;
  password: string = "";
  birthdate: string = "";
  household: number = 0;
  formation: Formation = Formation.MMI;
  graduation: Graduation = Graduation["BAC+3"];
  isStudent: boolean = false;
  isWorker: boolean = false;
  token: string = "";
  qrCode: string = "";
  lastVisit: string = "";
  lastLocation: string = "";
  createdAt: string = "";


  constructor(firstname: string, lastname: string, birthdate: string, formation: Formation,
              graduation: Graduation, household: number, isStudent: boolean, isWorker: boolean, email: string, password: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.formation = formation;
    this.graduation = graduation;
    this.household = household;
    this.isStudent = isStudent;
    this.isWorker = isWorker;
    this.email = email;
    this.password = password;
  }
}
