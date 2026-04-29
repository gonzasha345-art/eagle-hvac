# Eagle Heating & Cooling Company - Angular Website

A professional, responsive Angular website for Eagle HVAC and Electrical Company featuring complete service showcases, an interactive contact form, and modern UX/UI design.

## Features

✨ **Key Features:**
- **Responsive Design** - Mobile-first approach that works on all devices
- **Service Showcase** - Display commercial and residential HVAC/electrical services
- **About Page** - Company mission, values, and team information
- **Contact Form** - Interactive form with validation that sends inquiries to eric@eaglehce.com
- **Professional UI/UX** - Modern design with smooth animations and transitions
- **24/7 Emergency Contact** - Direct phone (248-805-6611) and email links
- **Accessibility** - Built with semantic HTML and best practices

## Tech Stack

- **Angular 17** - Modern web framework
- **TypeScript** - For type-safe development
- **Reactive Forms** - Advanced form handling with validation
- **CSS3** - Custom responsive styling
- **RxJS** - Reactive programming

## Project Structure

```
eagle-hvac/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/           # Navigation header
│   │   │   ├── footer/           # Footer with links and info
│   │   │   ├── home/             # Landing page
│   │   │   ├── about/            # Company information
│   │   │   ├── services/         # Services showcase
│   │   │   └── contact/          # Contact form
│   │   ├── services/
│   │   │   └── email.service.ts  # Email service integration
│   │   ├── app.module.ts         # Root module
│   │   ├── app-routing.module.ts # Routing configuration
│   │   └── app.component.*       # Root component
│   ├── index.html                # Main HTML file
│   ├── main.ts                   # Application entry point
│   └── styles.css                # Global styles
├── angular.json                  # Angular CLI configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                      # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Angular CLI** (installed via npm)

### Installation

1. **Navigate to the project directory:**
```bash
cd eagle-hvac
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser and visit:**
```
http://localhost:4200/
```

The application will automatically reload when you make changes to any source files.

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/eagle-hvac` directory.

## Pages & Routes

- **Home** (`/`) - Landing page with service overview
- **Services** (`/services`) - Detailed service offerings
- **About** (`/about`) - Company information and values
- **Contact** (`/contact`) - Contact form and business information

## Contact Form

The contact form includes:
- ✓ Name validation
- ✓ Email validation
- ✓ Phone number formatting and validation (10 digits)
- ✓ Service type selection
- ✓ Message validation (minimum 10 characters)
- ✓ Preferred contact method selection

**Form Submission:**
- Form data is logged to the console for demonstration
- Currently ready for backend integration via `/api/send-email`
- Sends inquiries to: **eric@eaglehce.com**
- Company phone: **248-805-6611**

### Setting Up Email Backend

To enable actual email functionality, set up a backend API endpoint that:

1. Accepts POST requests at `/api/send-email`
2. Receives form data with user information
3. Sends email to eric@eaglehce.com

Example backend implementation (Node.js/Express):
```javascript
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, serviceType, message, preferredContact } = req.body;
  
  // Send email using nodemailer, SendGrid, or similar
  const mailOptions = {
    to: 'eric@eaglehce.com',
    subject: `New Contact Form Submission - ${serviceType}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Type:</strong> ${serviceType}</p>
      <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };
  
  // Send email and respond
  res.json({ success: true });
});
```

## Customization

### Colors & Branding

Edit the color scheme in `src/styles.css`:
- Primary Color: `#1a5f7a` (Teal)
- Accent Color: `#ff6b35` (Orange)

### Content

- Update company information in component HTML files
- Modify service offerings in `services.component.ts`
- Update about page in `about.component.html`

### Phone & Email

Update contact details throughout the site:
- Company Phone: `248-805-6611`
- Company Email: `eric@eaglehce.com`

## Available Commands

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Watch mode development
npm run watch
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Images are optimized with lazy loading
- CSS is minified in production
- Angular tree-shaking removes unused code
- Routing uses lazy loading where applicable

## License

© 2026 Eagle Heating & Cooling Company. All rights reserved.

## Support

For technical support or questions about the website:
- 📞 Phone: 248-805-6611
- ✉️ Email: eric@eaglehce.com
- 🚨 24/7 Emergency: 248-805-6611
