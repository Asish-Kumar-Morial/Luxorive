import { ChangeDetectorRef, Component } from '@angular/core';
import { CutomerService } from '../../services/cutomer-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-my-bids',
  standalone: false,
  templateUrl: './my-bids.html',
  styleUrl: './my-bids.scss'
})
export class MyBids {

  bids: any = [];
  hoveredCard: number | null = null;
  isSpinning: boolean = false;

  constructor(private service: CutomerService,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getMyBids();
  }

  getMyBids() {
    this.isSpinning = true;
    this.service.getMyBids().subscribe((res) => {
      this.isSpinning = false;
      console.log("Fetched cars:", res);
      this.bids = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

}
