import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    {
      title: 'Commercial HVAC',
      icon: 'fa-building',
      description: 'Professional heating and cooling solutions for commercial buildings, offices, and industrial facilities.',
      details: [
        'HVAC installation and design',
        'System maintenance and repairs',
        'Energy efficiency upgrades',
        '24/7 emergency service'
      ]
    },
    {
      title: 'Residential HVAC',
      icon: 'fa-home',
      description: 'Keep your home comfortable year-round with reliable heating and air conditioning services.',
      details: [
        'Furnace and AC installation',
        'Regular maintenance plans',
        'Emergency repairs',
        'System optimization'
      ]
    },
    {
      title: 'Commercial Water Heater Services',
      icon: 'fa-industry',
      description: 'Complete water heater solutions for commercial properties including installation, maintenance, and repairs.',
      details: [
        'Water heater system design',
        'Code-compliant installation',
        'Preventive maintenance',
        'Emergency water heater service'
      ]
    },
    {
      title: 'Residential Water Heater Services',
      icon: 'fa-shower',
      description: 'Professional water heater services to keep your home supplied with hot water safely and efficiently.',
      details: [
        'Tank and tankless installation',
        'System upgrades',
        'Repair and replacement',
        'Water heater safety inspections'
      ]
    },
    {
      title: 'Preventive Maintenance',
      icon: 'fa-wrench',
      description: 'Regular maintenance plans to keep your systems running efficiently and prevent costly breakdowns.',
      details: [
        'Seasonal inspections',
        'System cleaning and maintenance',
        'Performance optimization',
        'Priority emergency response'
      ]
    },
    {
      title: 'Emergency Service',
      icon: 'fa-phone',
      description: 'Available 24/7 for urgent HVAC and water heater emergencies. We respond quickly to keep you comfortable and safe.',
      details: [
        'Round-the-clock availability',
        'Fast response times',
        'Expert diagnostics',
        'Emergency repairs'
      ]
    }
  ];
}
