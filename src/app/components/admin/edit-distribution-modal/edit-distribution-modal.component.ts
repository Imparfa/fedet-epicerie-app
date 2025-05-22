import {AfterViewInit, Component, Input} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {Distribution} from "../../../models/distribution";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ManagementService} from "../../../services/management.service";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-edit-distribution-modal',
  templateUrl: './edit-distribution-modal.component.html',
  styleUrls: ['./edit-distribution-modal.component.scss'],
  imports: [
    IonicModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditDistributionModalComponent implements AfterViewInit {
  @Input() editDistributionModal: IonModal | undefined;
  @Input() distribution: Distribution | null = null;
  @Input() loadFunction: Function | undefined;
  updatedDistribution: Partial<Distribution> = {};

  constructor(private managementService: ManagementService, private deviceService: DeviceService) {
  }

  ngAfterViewInit(): void {
    if (this.distribution) {
      this.updatedDistribution = {
        ...this.distribution,
      };
    }
  }

  async saveChanges() {
    if (this.distribution !== null) {
      this.managementService.updateDistribution(this.distribution.id, this.updatedDistribution).subscribe((updated) => {
        if (this.loadFunction)
          this.loadFunction()
        this.editDistributionModal?.dismiss(updated, 'submit').then();
      });
    } else if (this.updatedDistribution.name && this.updatedDistribution.name.length > 0) {
      this.managementService.createDistribution(this.updatedDistribution).subscribe((created) => {
        if (this.loadFunction)
          this.loadFunction()
        this.editDistributionModal?.dismiss(created, 'submit').then();
      });
    } else {
      console.error('Distribution name is required');
      await this.deviceService.showToast('Un nom est requis pour la Distribution', 'danger', 'alert-circle');
      // this.editDistributionModal?.dismiss(null, 'cancel').then();
    }
  }

  deleteDistribution(id: string | undefined) {
    if (!id)
      return;
    this.managementService.deleteDistribution(id).subscribe((deleted) => {
      if (this.loadFunction)
        this.loadFunction()
      this.editDistributionModal?.dismiss(deleted, 'submit').then();
    });
  }

  cancel() {
    this.editDistributionModal?.dismiss(null, 'cancel').then();
  }
}
