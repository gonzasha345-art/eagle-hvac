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

    const formData = {
      ...this.contactForm.value,
      companyPhone: '260-413-9966',
      companyEmail: 'gonzasha345@gmail.com'
    };

    // Log the form data (for demonstration - replace with actual backend call)
    this.emailService.logFormData(formData);

    // Simulate successful submission
    setTimeout(() => {
      this.submitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      this.submitted = false;

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);

    /* Uncomment this when you have a backend endpoint set up:
    this.emailService.sendContactForm(formData).subscribe(
      (response) => {
        this.submitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitted = false;

        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      (error) => {
        this.submitting = false;
        this.submitError = true;
        this.errorMessage = 'Failed to send message. Please try again.';
        console.error('Error:', error);
      }
    );
    */
  }

  formatPhoneNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      if (value.length > 6) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      }
      this.contactForm.patchValue({ phone: value }, { emitEvent: false });
    }
  }
}
