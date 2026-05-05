import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = this.getApiUrl();

  constructor(private http: HttpClient) {}

  sendContactForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Alternative: Log form data for demonstration
  logFormData(data: any): void {
    console.log('Contact Form Submission:', {
      ...data,
      phone: '248-805-6611',
      sendTo: 'eric@eagleheatandcool.com',
      timestamp: new Date()
    });
  }

  private getApiUrl(): string {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    return isLocal
      ? '/api/send-email'
      : 'https://eagle-hvac.onrender.com/api/send-email';
  }
}
