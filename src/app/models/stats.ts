export interface Stats {
  totalStudents: number;
  totalVisits: number;
  visitsToday: number;
  cardPayments: number;
  cashPayments: number;
  totalDistributions: number;
  visitsByDistribution: {
    name: string;
    count: number;
  }[];
  mostActiveFormations: {
    name: string;
    count: number;
  }[];
}
