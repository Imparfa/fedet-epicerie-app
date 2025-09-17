import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Card} from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl = 'http://fedet.truttmann.fr:8080';

  constructor(private http: HttpClient) {}

  getStudentCard(studentId: string): Observable<Card> {
    const url = `${this.apiUrl}/student/${studentId}/card`;

    console.log('[CardService] Envoi requête getStudentCard:', { url, studentId });

    return this.http.get<Card>(url).pipe(
      tap(response => {
        console.log('[CardService] Réponse reçue de getStudentCard:', response);
      }),
      catchError(err => {
        console.error('[CardService] Erreur getStudentCard:', err);
        return throwError(() => err);
      })
    );
  }

  getCardImage(cardId: string, side: 'front' | 'back' = 'front'): Observable<Blob> {
    const url = `${this.apiUrl}/student/cards/${cardId}/image?side=${side}`;

    console.log('[CardService] Envoi requête image:', { url, side });

    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap(response => {
        console.log('[CardService] Réponse reçue:', response);
        console.log('[CardService] Type MIME:', response.type);
        console.log('[CardService] Taille:', response.size, 'octets');
      }),
      catchError(err => {
        console.error('[CardService] Erreur lors de la récupération de l’image:', err);
        return throwError(() => err);
      })
    );
  }

  uploadCard(studentId: string, side: 'front' | 'back', file: File) {
    const url = `${this.apiUrl}/student/${studentId}/card?side=${side}`;
    const formData = new FormData();
    formData.append('file', file);

    console.log('[CardService] Envoi upload:', { url, side, fileName: file.name, size: file.size });

    return this.http.post<void>(url, formData).pipe(
      tap(() => console.log('[CardService] Upload réussi')),
      catchError(err => {
        console.error('[CardService] Erreur upload:', err);
        return throwError(() => err);
      })
    );
  }

  listPending(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/management/cards/pending`);
  }

  approve(cardId: string, validityDate?: string, note?: string): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/management/cards/${cardId}/approve`, { validityDate });
  }

  reject(cardId: string, reason: string): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/management/cards/${cardId}/reject`, { reason });
  }
}
