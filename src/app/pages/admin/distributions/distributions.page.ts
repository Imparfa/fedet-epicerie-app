import {Component, ViewChild} from '@angular/core';
import {IonicModule, IonModal, ViewWillEnter} from "@ionic/angular";
import {ManagementService} from "../../../services/management.service";
import {Distribution} from "../../../models/distribution";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {
  EditDistributionModalComponent
} from "../../../components/admin/edit-distribution-modal/edit-distribution-modal.component";

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.page.html',
  styleUrls: ['./distributions.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf,
    EditDistributionModalComponent
  ]
})
export class DistributionsPage implements ViewWillEnter {
  @ViewChild("editDistributionModal") editDistributionModal: IonModal | undefined;
  distributions: Distribution[] = [];
  selectedDistribution: Distribution | null = null;
  searchQuery: string = '';

  constructor(private managementService: ManagementService) {
  }

  ionViewWillEnter() {
    this.loadDistributions();
  }

  loadDistributions() {
    this.managementService.getDistributions().subscribe({
      next: (data) => this.distributions = data,
      error: (err) => console.error(err),
    });
  }

  selectDistribution(distribution: Distribution) {
    this.selectedDistribution = distribution;
    this.editDistributionModal?.present();
  }

  createDistribution() {
    this.selectedDistribution = null;
    this.editDistributionModal?.present();
  }

  filterDistributions(): Distribution[] {
    const query = this.searchQuery.toLowerCase();
    return this.distributions.filter(d =>
      d.name?.toLowerCase().includes(query) ||
      d.address?.toLowerCase().includes(query)
    );
  }
}
