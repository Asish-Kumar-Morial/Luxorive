import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CutomerService } from '../../services/cutomer-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-car',
  standalone: false,
  templateUrl: './search-car.html',
  styleUrls: ['./search-car.scss']  // ✅ FIXED
})
export class SearchCar implements OnInit {

  listOfBrands = ["BMW", "AUDI", "FERRARI", "JAGUAR", "ROLLS-ROYCE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  searchCarForm!: FormGroup;
  isSpinning: boolean = false;
  cars: any[] = [];

  constructor(
    private service: CutomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar(): void {
    this.isSpinning = true;
    this.cars = [];

    this.service.searchCar(this.searchCarForm.value).subscribe({
      next: (res) => {
        this.cars = res;
        this.isSpinning = false;
        this.cdr.detectChanges();  // ✅ important
        if (res.length === 0) {
          this.message.warning('No cars found for selected filters');
        }
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error('Error fetching cars');
      }
    });
  }
}
