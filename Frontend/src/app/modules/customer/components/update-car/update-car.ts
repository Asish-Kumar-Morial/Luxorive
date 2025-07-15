import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CutomerService } from '../../services/cutomer-service';
import { StorageService } from '../../../../auth/services/storage/storage-service';

@Component({
  selector: 'app-update-car',
  standalone: false,
  templateUrl: './update-car.html',
  styleUrls: ['./update-car.scss']
})
export class UpdateCar implements OnInit {

  updateCarForm!: FormGroup;
  id!: number;
  existingImage: string | null = null;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageChanged: boolean = false;

  listOfBrands = ["BMW", "AUDI", "FERRARI", "JAGUAR", "ROLLS-ROYCE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private service: CutomerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],  // store year as number (e.g. 2024)
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCar();
  }

  getCar() {
    this.service.getCarById(this.id).subscribe((res) => {
      this.existingImage = 'data:image/jpg;base64,' + res.returnedImg;

      const modelYear = res.model && !isNaN(res.model) ? Number(res.model) : null;

      this.updateCarForm.patchValue({
        brand: res.brand,
        name: res.name,
        type: res.type,
        transmission: res.transmission,
        color: res.color,
        year: modelYear,
        description: res.description,
        price: res.price
      });
    });
  }

  onYearChange(event: any): void {
    const selected = Array.isArray(event.date) ? event.date[0] : event.date;
    if (selected) {
      const year = new Date(selected).getFullYear();
      this.updateCarForm.patchValue({ year });
    }
  }

  updateCar() {
    this.isSpinning = true;

    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append("img", this.selectedFile);
    }

    formData.append("brand", this.updateCarForm.get('brand')?.value);
    formData.append("name", this.updateCarForm.get('name')?.value);
    formData.append("type", this.updateCarForm.get('type')?.value);
    formData.append("color", this.updateCarForm.get('color')?.value);
    formData.append("model", this.updateCarForm.get('year')?.value);  // ✅ Send year directly
    formData.append("transmission", this.updateCarForm.get('transmission')?.value);
    formData.append("description", this.updateCarForm.get('description')?.value);
    formData.append("price", this.updateCarForm.get('price')?.value);
    formData.append("userId", StorageService.getUserId());

    this.service.updateCar(this.id, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.cdr.detectChanges();
        this.message.success(`✅ Car "${this.updateCarForm.value.name}" Updated successfully`);
        this.updateCarForm.reset();
        this.router.navigateByUrl("/customer/dashboard");
      },
      (error) => {
        this.isSpinning = false;
        this.cdr.detectChanges();
        this.message.error('Please fill all fields correctly before posting.');
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage();
      this.imageChanged = true;
      this.existingImage = null;
    }
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cdr.detectChanges();
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
