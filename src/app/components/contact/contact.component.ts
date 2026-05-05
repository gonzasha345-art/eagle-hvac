import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  submitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$|^\d{3}-\d{3}-\d{4}$/)]],
      serviceType: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      preferredContact: ['email', Validators.required]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData = this.contactForm.value;

    // Send email using EmailJS
    this.emailService.sendContactForm(formData).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        this.submitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitted = false;

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      (error) => {
        console.error('Error sending email:', error);
        this.submitting = false;
        this.submitError = true;
        this.errorMessage = error?.error?.message || 'Failed to send message. Please try again or call us directly.';
      }
    );
  }

  scrollToForm(): void {
    const formElement = document.querySelector('.contact-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  formatPhoneNumber(event: any): void {
    const input = event.target.value.replace(/\D/g, '');
    if (input.length > 0) {
      const formatted = input.length <= 3 
        ? input 
        : input.length <= 6 
        ? `${input.slice(0, 3)}-${input.slice(3)}` 
        : `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
      this.contactForm.get('phone')?.setValue(formatted, { emitEvent: false });
    }
  }

  // formatPhoneNumber(event: any): void {
  //   let value = event.target.value.replace(/\D/g, '');
  //   if (value.length <= 10) {
  //     if (value.length > 6) {
  //       value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
  //     } else if (value.length > 3) {
  //       value = value.slice(0, 3) + '-' + value.slice(3);
  //     }
  //     this.contactForm.patchValue({ phone: value }, { emitEvent: false });
  //   }
  // }
}
