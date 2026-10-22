// src/app/guards/user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userStr = localStorage.getItem('CurrentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === '1') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
