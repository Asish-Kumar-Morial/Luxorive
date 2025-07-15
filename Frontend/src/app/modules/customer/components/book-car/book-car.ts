import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CutomerService } from '../../services/cutomer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { StorageService } from '../../../../auth/services/storage/storage-service';

@Component({
  selector: 'app-book-car',
  standalone: false,
  templateUrl: './book-car.html',
  styleUrl: './book-car.scss'
})
export class BookCar implements OnInit{

  id!: number;
  car: any;
  bidForm: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: CutomerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.bidForm = this.fb.group({
      price: [null, [Validators.required]]
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCar();
  }

  getCar() {
    this.service.getCarById(this.id).subscribe((res) => {
      console.log(res);
      this.car = res;
      this.cdr.detectChanges(); // 🔁 Force Angular to re-check view
    });
  }

  bidCar(formData: any){
    this.isSpinning=true;
    const obj = {
      price: formData.price,
      userId: StorageService.getUserId(),
      carId: this.id
    };
    this.service.bidCar(obj).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success(`✅ Bid for "${this.bidForm.value.name}" registered successfully`);
        this.bidForm.reset();
        this.router.navigateByUrl("/customer/dashboard");
      },
      (error) => {
        this.message.error('Please fill all fields correctly before posting.');
      }
    );
  }

}
