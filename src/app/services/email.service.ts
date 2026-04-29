import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // EmailJS configuration - Get your keys from https://dashboard.emailjs.com
  private serviceId = 'service_YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
  private templateId = 'template_YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
  private publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

  constructor() {
    // Initialize EmailJS
    emailjs.init(this.publicKey);
  }

  sendContactForm(data: any): Observable<any> {
    // Send email using EmailJS
    const templateParams = {
      to_email: '260-413-9966',  // Your email or phone number formatted as email
      to_phone: '260-413-9966',  // Your phone number
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      service_type: data.serviceType,
      message: data.message,
      preferred_contact: data.preferredContact
    };

    return from(emailjs.send(this.serviceId, this.templateId, templateParams));
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
