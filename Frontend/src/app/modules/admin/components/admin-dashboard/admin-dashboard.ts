import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {

  cars: any = [];
  hoveredCard: number | null = null;

  constructor(private service: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.service.getAllCars().subscribe((res) => {
      console.log("Fetched cars:", res);
      this.cars = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }
}
