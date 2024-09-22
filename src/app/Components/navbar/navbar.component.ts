import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
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
