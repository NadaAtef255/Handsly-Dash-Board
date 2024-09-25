import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { RouterLink } from '@angular/router';
import { IService } from '../../interfaces/service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'] // Note: Changed from styleUrl to styleUrls
})
export class ServiceListComponent implements OnInit {
  private readonly _serviceService = inject(ServiceService);

  services!: IService[];
  filteredServices!: IService[];
  searchTerm: string = '';
  isValid: boolean = true;

  ngOnInit(): void {
    console.log('Service List Component initialized');
    this._serviceService.getServices().subscribe({
      next: (response) => {
        console.log(response);
        this.services = response.data.services;
        this.filteredServices = this.services; // Initialize filteredServices
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }

// Prevent the user from entering numbers
preventNumbers(event: KeyboardEvent): void {
  const regex = /[0-9]/;  // التعبير المنتظم الذي يمثل الأرقام
  if (regex.test(event.key)) {
    event.preventDefault();  // منع إدخال الحرف إذا كان رقمًا
  }
}

filterServices(): void {
  const regex = /^[a-zA-Z\s]*$/;  // يسمح فقط بالحروف والمسافات
  if (!regex.test(this.searchTerm)) {
    this.isValid = false; // Set validation flag to false
    this.filteredServices = this.services; // Reset to all services
    return; // Exit early if input is invalid
  } else {
    this.isValid = true; // Set validation flag to true
  }

  // Filter services based on valid input
  this.filteredServices = this.services.filter(service =>
    service.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}
