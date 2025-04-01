import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ManagementService} from "../../../services/management.service";
import {Distribution} from "../../../models/distribution";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.page.html',
  styleUrls: ['./distributions.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf
  ]
})
export class DistributionsPage implements OnInit {
  distributions: Distribution[] = [];
  newDistributionName: string = '';

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
    this.loadDistributions();
  }

  loadDistributions() {
    this.managementService.getDistributions().subscribe({
      next: (data) => this.distributions = data,
      error: (err) => console.error(err),
    });
  }

  updateDistribution(distribution: Distribution) {
    this.managementService.updateDistribution(distribution.id, distribution).subscribe(this.loadDistributions);
  }

  deleteDistribution(id: string) {
    this.managementService.deleteDistribution(id).subscribe(() => {
      this.distributions = this.distributions.filter(p => p.id !== id);
    });
  }

  createDistribution() {
    const name = this.newDistributionName.trim();
    if (!name) return;
    this.managementService.createDistribution({name, isActive: true}).subscribe((created) => {
      this.distributions.unshift(created);
      this.newDistributionName = '';
    });
  }
}
