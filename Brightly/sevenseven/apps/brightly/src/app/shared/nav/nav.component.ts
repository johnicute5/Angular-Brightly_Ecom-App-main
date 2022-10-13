import { Component, OnInit } from '@angular/core';
import { AuthService } from '@sevenseven/users';
@Component({
  selector: 'brightly-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  logoutUser() {
    this.authService.logout();
  }
}
