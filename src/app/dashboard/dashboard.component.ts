import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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

  // dropdown nav & img
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const userMenuButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (
      userMenuButton &&
      !userMenuButton.contains(target) &&
      dropdownMenu &&
      !dropdownMenu.contains(target)
    ) {
      this.isDropdownOpen = false;
    }
  }
}
