import { Component, OnInit } from '@angular/core';
// import { Engineer, EngineerService, } from 'src/app/Services/enineer.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EngineerService } from '../../Services/enineer.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class EngineersListComponent implements OnInit {
  engineers: any[] = [];

  constructor(private _engineerService: EngineerService) {}
  ngOnInit(): void {
    this._engineerService.getEngineers().subscribe((data) => {
      console.log('nnnnada', data);
      this.engineers = Object.values(data); // تحويل الكائن إلى مصفوفة باستخدام Object.values
    });
  }

  // ngOnInit(): void {
  //   this._engineerService.getEngineers().subscribe((data) => {
  //     console.log('ffff', data.engineers);
  //     // this.engineers = data;
  //   });
  // }
}
