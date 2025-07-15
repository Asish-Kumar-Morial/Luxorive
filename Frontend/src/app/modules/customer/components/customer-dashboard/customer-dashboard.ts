import { ChangeDetectorRef, Component } from '@angular/core';
import { CutomerService } from '../../services/cutomer-service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: false,
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.scss']
})
export class CustomerDashboard {

  cars: any = [];
  hoveredCard: number | null = null;
  analytics: any;

  constructor(private service: CutomerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCars();
    this.getAnalytics();
  }

  getCars() {
    this.service.getAllCars().subscribe((res) => {
      console.log("Fetched cars:", res);
      this.cars = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

  getAnalytics() {
    this.service.getAnalytics().subscribe((res) => {
      console.log("Fetched cars:", res);
      this.analytics = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

  gridStyle = {
    width: '50',
    textAlign: 'center'
  }

}
