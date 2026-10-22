import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

// import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})

export class UserDropdownComponent {

  dropdownOpen = false;

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.dropdownOpen &&
      this.dropdownContainer &&
      !this.dropdownContainer.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = false;
    }
  }
}
