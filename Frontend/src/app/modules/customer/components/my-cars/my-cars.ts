import { ChangeDetectorRef, Component } from '@angular/core';
import { CutomerService } from '../../services/cutomer-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-my-cars',
  standalone: false,
  templateUrl: './my-cars.html',
  styleUrls: ['./my-cars.scss']
})
export class MyCars {

  cars: any = [];
  hoveredCard: number | null = null;

  constructor(private service: CutomerService, 
    private cdr: ChangeDetectorRef,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.service.getMyCars().subscribe((res) => {
      console.log("Fetched cars:", res);
      this.cars = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

  deleteCar(id: number){
    this.service.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully", { nzDuration: 4000});
      this.getCars();
    });
  }
}
