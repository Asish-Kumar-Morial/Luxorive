import { ChangeDetectorRef, Component } from '@angular/core';
import { CutomerService } from '../../services/cutomer-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-bids',
  standalone: false,
  templateUrl: './manage-bids.html',
  styleUrl: './manage-bids.scss'
})
export class ManageBids {

  carId: number;
  bids: any = [];
  hoveredCard: number | null = null;
  isSpinning: boolean = false;

  constructor(private service: CutomerService,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params[`id`];
    this.getMyBids();
  }

  getMyBids() {
    this.isSpinning = true;
    this.service.getBidByCarId(this.carId).subscribe((res) => {
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
      this.isSpinning = false;
      this.message.success('✅ Bid status updated'),
        this.getMyBids();
    }, error => {
      this.message.error('Something went wrong')
    });
    this.cdr.detectChanges(); // 👈 Ensures view is updated
  }
}
