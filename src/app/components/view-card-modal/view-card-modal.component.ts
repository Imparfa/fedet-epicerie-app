import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {Student} from "../../models/student";
import {Card} from "../../models/card";
import {DatePipe, NgIf} from "@angular/common";
import {CardService} from "../../services/card.service";
import {AuthenticationService} from "../../services/authentication.service";
import {DeviceService} from "../../services/device.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-card-modal',
  templateUrl: './view-card-modal.component.html',
  styleUrls: ['./view-card-modal.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    NgIf,
    FormsModule
  ]
})
export class ViewCardModalComponent implements AfterViewInit, OnDestroy {

  @Input() viewCardModal: IonModal | undefined;
  @Input() student: Student | null | undefined;
  card: Card | null = null;
  frontCardImage: string = '';
  backCardImage: string = '';
  newFrontCardImage: File | null = null;
  newBackCardImage: File | null = null;
  validityDate: string = '';
  reason?: string;

  constructor(private cardService: CardService, private authService: AuthenticationService, private deviceService: DeviceService) {
  }

  ngAfterViewInit() {
    console.log(this.student);
    this.loadCard()
  }

  loadCard() {
    const studentId = this.student?.id;
    if (studentId) {
      this.cardService.getStudentCard(studentId).subscribe({
        next: c => {
          this.card = c
          this.loadCardImages(this.card);
          console.log(this.card);
          console.log(this.frontCardImage);
          console.log(this.backCardImage);
        },
        error: () => this.card = null
      });
    } else
      this.card = null;
  }

  loadCardImages(card: Card) {
    this.cardService.getCardImage(card.id, 'front').subscribe(blob => {
      this.frontCardImage = URL.createObjectURL(blob);
    });
    if (card.backPath) {
      this.cardService.getCardImage(card.id, 'back').subscribe(blob => {
        this.backCardImage = URL.createObjectURL(blob);
      });
    }
  }

  cancel() {
    this.viewCardModal?.dismiss(null, 'cancel').then();
  }

  ngOnDestroy() {
    if (this.frontCardImage) URL.revokeObjectURL(this.frontCardImage);
    if (this.backCardImage) URL.revokeObjectURL(this.backCardImage);
  }

  onFrontSelected(event: any) {
    this.newFrontCardImage = event.target.files[0];
    console.log('[CardModal] Fichier recto sélectionné:', this.newFrontCardImage);
  }

  onBackSelected(event: any) {
    this.newBackCardImage = event.target.files[0];
    console.log('[CardModal] Fichier verso sélectionné:', this.backCardImage);
  }

  uploadCard(side: 'front' | 'back') {
    const studentId = this.student?.id;
    const file = side === 'front' ? this.newFrontCardImage : this.newBackCardImage;

    if (!file || !studentId) {
      console.warn(`[ProfilPage] Aucun fichier pour ${side}`);
      return;
    }

    this.cardService.uploadCard(studentId, side, file).subscribe({
      next: () => {
        console.log(`[ProfilPage] Upload ${side} terminé`);
        this.loadCard(); // recharger la carte pour voir la MAJ
      },
      error: (err) => console.error(`[ProfilPage] Erreur upload ${side}:`, err)
    });
  }

  approve() {
    if (!this.card) return;
    this.cardService.approve(this.card.id, this.validityDate, '').subscribe({
      next: async _ => {
        await this.deviceService.showToast('Carte validé', 'success', 'checkmark-circle');
      },
      error: async err => {
        console.error(err);
        await this.deviceService.showToast('Erreur du côté serveur', 'warning', 'warning');
      }
    });
  }

  reject() {
    if (!this.reason || !this.card) return;
    this.cardService.reject(this.card.id, this.reason).subscribe({
      next: async _ => {
        await this.deviceService.showToast('Carte refusé', 'danger', 'alert-circle');
      },
      error: async err => {
        console.error(err);
        await this.deviceService.showToast('Erreur du côté serveur', 'warning', 'warning');
      }
    });
  }

  isAdmin() {
    return !this.authService.isStudent;
  }
}
