import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Backend endpoint for email (you'll need to set this up on your server)
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) { }

  sendContactForm(data: any): Observable<any> {
    // Note: This requires a backend endpoint to send emails
    // For now, it sends to the API endpoint you configure
    return this.http.post(this.apiUrl, {
      ...data,
      phone: '260-413-9966',
      email: 'gonzasha345@gmail.com'
    });
  }

  // Alternative: Log form data for demonstration
  logFormData(data: any): void {
    console.log('Contact Form Submission:', {
      ...data,
      phone: '260-413-9966',
      sendTo: 'gonzasha345@gmail.com',
      timestamp: new Date()
    });
  }
}
