const path = require('path');
const fs = require('fs');
const dns = require('dns');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

dns.setDefaultResultOrder('ipv4first');

const app = express();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const allowedOrigins = (process.env.SITE_URL || 'http://127.0.0.1:4200,http://localhost:4200,https://eagleheatandcool.com,https://www.eagleheatandcool.com')
  .split(',')
  .map((origin) => origin.trim())
  .map((origin) => {
    try {
      return new URL(origin).origin;
    } catch (_error) {
      return origin;
    }
  })
  .filter(Boolean);
const mailTo = process.env.MAIL_TO || 'eric@eagleheatandcool.com';
const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;
const distPath = path.join(__dirname, '..', 'dist', 'eagle-hvac');
const indexPath = path.join(distPath, 'index.html');
const hasAngularBuild = fs.existsSync(indexPath);
const rateLimitWindowMs = 15 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const submissions = new Map();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '32kb' }));

function cleanText(value, maxLength = 1000) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactForm(body) {
  const data = {
    name: cleanText(body.name, 120),
    email: cleanText(body.email, 180),
    phone: cleanText(body.phone, 40),
    serviceType: cleanText(body.serviceType, 80),
    message: cleanText(body.message, 4000),
    preferredContact: cleanText(body.preferredContact, 30)
  };

  if (data.name.length < 2) return { error: 'Please enter your full name.' };
  if (!isValidEmail(data.email)) return { error: 'Please enter a valid email address.' };
  if (!/^[\d\s()+.-]{10,20}$/.test(data.phone)) return { error: 'Please enter a valid phone number.' };
  if (!data.serviceType) return { error: 'Please select a service type.' };
  if (data.message.length < 10) return { error: 'Please enter a message with at least 10 characters.' };

  return { data };
}

function rateLimit(req) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = submissions.get(key) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + rateLimitWindowMs;
  }

  record.count += 1;
  submissions.set(key, record);

  return record.count <= maxSubmissionsPerWindow;
}

function createTransporter() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length || !mailFrom) {
    throw new Error(`Missing email configuration: ${missing.concat(mailFrom ? [] : ['MAIL_FROM']).join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function renderEmail(data) {
  return `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Service Type:</strong> ${data.serviceType}</p>
    <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;
}

app.get('/', (_req, res) => {
  if (hasAngularBuild) {
    return res.sendFile(indexPath);
  }

  return res.json({
    ok: true,
    service: 'Eagle HVAC email API',
    health: '/api/health',
    sendEmail: '/api/send-email'
  });
});

app.post('/api/send-email', async (req, res) => {
  if (!rateLimit(req)) {
    return res.status(429).json({ message: 'Too many submissions. Please try again later.' });
  }

  const result = validateContactForm(req.body);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Eagle Website" <${mailFrom}>`,
      replyTo: result.data.email,
      to: mailTo,
      subject: `New Contact Form Submission - ${result.data.serviceType}`,
      text: [
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        `Phone: ${result.data.phone}`,
        `Service Type: ${result.data.serviceType}`,
        `Preferred Contact: ${result.data.preferredContact}`,
        '',
        result.data.message
      ].join('\n'),
      html: renderEmail(result.data)
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error.message);
    res.status(500).json({ message: 'Unable to send message right now. Please call us directly.' });
  }
});

if (hasAngularBuild) {
  app.use(express.static(distPath));
}

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) {
    return next();
  }

  if (hasAngularBuild) {
    return res.sendFile(indexPath);
  }

  return res.status(404).json({ message: 'Not found' });
});

app.use((error, _req, res, _next) => {
  console.error('Unhandled request error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, host, () => {
  console.log(`Eagle HVAC server listening on ${host}:${port}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ') || 'none'}`);
  console.log(`Angular build detected: ${hasAngularBuild}`);
});
