import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Dropdown button sidebar
  isDropdownOpenSide = false;
  toggleDropdownSide() {
    this.isDropdownOpenSide = !this.isDropdownOpenSide;
  }
  // isOpen = false;
  // toggleDropdownSide() {
  //   this.isOpen = !this.isOpen;
  // }
  // Accordion sidebar
  isAccordionOpen: number | null = null;

  toggleAccordion(index: number): void {
    this.isAccordionOpen = this.isAccordionOpen === index ? null : index;
  }
}
