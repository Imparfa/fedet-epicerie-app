import {Component} from '@angular/core';
import {IonicModule, ViewWillEnter} from "@ionic/angular";
import {CollectService} from "../../../services/collect.service";
import {ManagementService} from "../../../services/management.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Distribution} from "../../../models/distribution";
import {Student} from "../../../models/student";
import {BarcodeScanner} from '@capacitor-mlkit/barcode-scanning';
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.page.html',
  styleUrls: ['./cash-register.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ]
})
export class CashRegisterPage implements ViewWillEnter {
  distributions: Distribution[] = [];

  scannedStudent: Student | null = null;
  paymentMethod: 'CASH' | 'CARD' = 'CASH';

  constructor(public collectService: CollectService, private deviceService: DeviceService,
              private managementService: ManagementService) {
  }

  ionViewWillEnter() {
    this.managementService.getDistributions().subscribe({
      next: (res) => this.distributions = res.filter(d => d.isActive),
      error: (err) => console.error(err),
    }).add(() => {
      if (!this.collectService.isSupported) {
        this.open();
        this.selectDistribution(this.distributions[0]);
      }
    });
  }

  open() {
    this.collectService.isOpen = true;
    this.collectService.selectedDistribution = null;
  }

  selectDistribution(distribution: Distribution) {
    this.collectService.selectedDistribution = distribution;
    if (!this.collectService.isSupported)
      this.scan("52cbb6f9-bd09-470a-a063-2ca92fb51596");
  }

  selectPaymentMethod(method: 'CASH' | 'CARD') {
    this.paymentMethod = method;
  }

  async requestPermissions(): Promise<boolean> {
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async scan(id: string | null): Promise<void> {
    try {
      if (id) {
        this.collectService.scanStudent(id).subscribe({
          next: (student) => {
            this.scannedStudent = student;
            this.deviceService.showToast('Étudiant trouvé', 'success', 'checkmark-circle');
          },
        });
        return;
      }
      const granted = await this.requestPermissions();
      if (!granted) {
        await this.deviceService.showToast('Permission caméra refusée', 'danger', 'alert-circle');
        return;
      }
      const {barcodes} = await BarcodeScanner.scan();
      this.collectService.scanStudent(id ? id : barcodes[0].rawValue).subscribe({
        next: (student) => {
          this.scannedStudent = student;
          this.deviceService.showToast('Étudiant trouvé', 'success', 'checkmark-circle');
        },
        error: () => this.deviceService.showToast('Étudiant introuvable', 'danger', 'alert-circle'),
      });
    } catch (error) {
      await this.deviceService.showToast('Erreur lors du scan', 'danger', 'alert-circle');
      console.error('[MLKit Scan Error] ', error);
    }
  }

  validate() {
    if (!this.scannedStudent || !this.collectService.selectedDistribution) return;

    this.collectService.validateVisit({
      studentId: this.scannedStudent.id,
      distributionId: this.collectService.selectedDistribution.id,
      paymentMethod: this.paymentMethod,
    }).subscribe({
      next: () => {
        this.deviceService.showToast('Visite validée', 'success', 'checkmark-done-circle');
        this.scannedStudent = null;
      },
      error: (err) => {
        if (err.status === 409) {
          this.deviceService.showToast('Déjà passé aujourd’hui', 'warning', 'warning');
        } else {
          this.deviceService.showToast('Erreur serveur', 'danger', 'alert-circle');
        }
      }
    });
  }

  close() {
    this.collectService.isOpen = false;
    this.collectService.selectedDistribution = null;
    this.scannedStudent = null;
  }
}
