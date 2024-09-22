import { Component, OnInit } from '@angular/core';
// import {  ClientService, } from 'src/app/Services/client.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientService } from '../../Services/client.service';
@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PaginationsComponent implements OnInit {
  clients: any[] = [];

  constructor(private _clientService: ClientService) {}

  ngOnInit(): void {
    this._clientService.getClients().subscribe((data) => {
      console.log('nnnnnnnnnn', data);
      this.clients = Object.values(data); // تحويل الكائن إلى مصفوفة باستخدام Object.values
    });
  }
}
