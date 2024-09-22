import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngineerService } from '../../Services/enineer.service';
import { CommonModule } from '@angular/common';
// import { EngineerService } from 'src/app/Services/enineer.service';

@Component({
  selector: 'app-engineer-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineer-profile.component.html',
  styleUrl: './engineer-profile.component.scss',
})
export class EngineerProfileComponent implements OnInit {
  engineer: any;

  constructor(
    private route: ActivatedRoute,
    private engineerService: EngineerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get ID from route
    this.engineerService.getEngineerById('id').subscribe((data) => {
      this.engineer = data; // Fetch engineer data
    });
  }
}
