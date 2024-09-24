import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { RouterLink } from '@angular/router';
import { IService } from '../../interfaces/service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServiceListComponent implements OnInit {
  private readonly _serviceService = inject(ServiceService);

  services!: IService[];

  ngOnInit(): void {
    console.log('Service List Component initialized');
    this._serviceService.getServices().subscribe({
      next: (response) => {
        console.log(response);
        this.services = response.data.services;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }
}
