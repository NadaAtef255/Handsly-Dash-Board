import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngineerService } from '../../services/engineer.service';
import { IEngineer } from '../../interfaces/iengineer';

@Component({
  selector: 'app-engineer-profile',
  standalone: true,
  imports: [],
  templateUrl: './engineer-profile.component.html',
  styleUrl: './engineer-profile.component.css',
})
export class EngineerProfileComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  private readonly _EngineerService = inject(EngineerService);
  engineer!: IEngineer;

  ngOnInit(): void {
    this._EngineerService
      .gerEngineerById(this._ActivatedRoute.snapshot.params['id'])

      .subscribe({
        next: (response) => {
          console.log('Dataaaaaa', response);
          this.engineer = response.data.engineer; // Storing the engineer data
        },
      });
  }
}
