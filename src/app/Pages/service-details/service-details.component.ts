import { Component, inject, OnInit } from '@angular/core';
import { IService } from '../../interfaces/service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {


  private readonly _serviceService = inject(ServiceService);
  private readonly route = inject(ActivatedRoute);

  serviceId!: string;
  service!: IService;

  ngOnInit(): void {
    // جلب معرف الخدمة من المسار
    this.serviceId = this.route.snapshot.paramMap.get('id')!;

    // جلب تفاصيل الخدمة باستخدام معرف الخدمة
    this._serviceService.getServiceById(this.serviceId).subscribe({
      next: (response) => {
        this.service = response.data.service;
      },
      error: (err) => {
        console.error('Error fetching service details:', err);
      }
    });
  }
}

