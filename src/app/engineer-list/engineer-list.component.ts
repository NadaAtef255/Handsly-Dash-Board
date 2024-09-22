import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EngineerService, Engineer } from '../services/engineer.service';

@Component({
  selector: 'app-engineer-list',
  templateUrl: './engineer-list.component.html',
  styleUrls: ['./engineer-list.component.css'],
  standalone: true,
  imports: [CommonModule], // Keep only CommonModule
})
export class EngineersListComponent implements OnInit {
  engineers: Engineer[] = [];

  constructor(private engineerService: EngineerService) {}

  ngOnInit(): void {
    console.log('Component initialized'); // Check if this logs
    this.fetchEngineers();
  }

  fetchEngineers() {
    this.engineerService.getEngineers().subscribe(
      (engineers: Engineer[]) => {
        this.engineers = engineers;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching engineers:', error);
      }
    );
  }
}
