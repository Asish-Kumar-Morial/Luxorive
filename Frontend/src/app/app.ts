import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage-service';
import { Router } from '@angular/router';
import { every } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Frontend';

  isAdminLoggedIn: Boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: Boolean = StorageService.isCustomerLoggedIn();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
