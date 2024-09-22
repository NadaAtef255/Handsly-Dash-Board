import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EngineerService } from '../../services/engineer.service';
import { IEngineer } from '../../interfaces/iengineer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-engineer-list',
  templateUrl: './engineer-list.component.html',
  styleUrls: ['./engineer-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink], // Keep only CommonModule
})
export class EngineersListComponent implements OnInit {
  private readonly _EngineerService = inject(EngineerService);

  engineers!: IEngineer[];

  ngOnInit(): void {
    console.log('Component initialized'); // Check if this logs
    this._EngineerService.getEngineers().subscribe({
      next: (response) => {
        console.log(response);
        this.engineers = response.data.engineers;
      },
    });
  }
}
