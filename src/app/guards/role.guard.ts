// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userStr = localStorage.getItem('CurrentUser');
    const allowedRoles = route.data['roles'] as string[];

    if (userStr && allowedRoles) {
      const user = JSON.parse(userStr);
      if (allowedRoles.includes(user.role)) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
