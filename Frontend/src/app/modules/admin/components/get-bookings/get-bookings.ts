import { ChangeDetectorRef, Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-bookings',
  standalone: false,
  templateUrl: './get-bookings.html',
  styleUrl: './get-bookings.scss'
})
export class GetBookings {

  bids: any = [];
  hoveredCard: number | null = null;
  isSpinning: boolean = false;

  constructor(private service: AdminService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getMyBids();
  }

  getMyBids() {
    this.isSpinning = true;
    this.service.getBids().subscribe((res) => {
      this.isSpinning = false;
      console.log("Fetched cars:", res);
      this.bids = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

  get hasPendingBids(): boolean {
    return this.bids.some(b => b.bidStatus === 'PENDING');
  }


  changeBookingStatus(id: number, status: string) {
    this.isSpinning = true;
    this.service.updateBidStatus(id, status).subscribe((res) => {
      this.isSpinning= false;
      this.message.success('✅ Bid status updated'),
      this.getMyBids();
    }, error => {
      this.message.error('Something went wrong')
    });
    this.cdr.detectChanges(); // 👈 Ensures view is updated
  }


}
