import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CutomerService } from '../../services/cutomer-service';
import dayjs, { Dayjs } from 'dayjs';
import { StorageService } from '../../../../auth/services/storage/storage-service';

@Component({
  selector: 'app-post-car',
  standalone: false,
  templateUrl: './post-car.html',
  styleUrl: './post-car.scss'
})
export class PostCar {

  postCarForm: FormGroup;
  isSpinning = false;
  selectedYear: Dayjs = dayjs();
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  listOfBrands = ["BMW", "AUDI", "FERRARI", "JAGUAR", "ROLLS-ROYCE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private service: CutomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) { }

  get brand() { return this.postCarForm.get('brand'); }
  get name() { return this.postCarForm.get('name'); }
  get type() { return this.postCarForm.get('type'); }
  get transmission() { return this.postCarForm.get('transmission'); }
  get color() { return this.postCarForm.get('color'); }
  get year() { return this.postCarForm.get('year'); }
  get price() { return this.postCarForm.get('price'); }
  get description() { return this.postCarForm.get('description'); }


  ngOnInit() {
    this.postCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]], // storing a number like 2025
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  onYearChange(event: any): void {
    const selected = Array.isArray(event.date) ? event.date[0] : event.date;
    if (selected) {
      const year = dayjs(selected).year();
      this.postCarForm.patchValue({ year });
    }
  }

  triggerFileUpload(): void {
    const fileInput = document.getElementById('upload_profile_image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  postCar() {
    this.isSpinning = true;
    console.log(this.postCarForm.value);
    console.log(this.selectedFile);

    const formData: FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("brand", this.postCarForm.get('brand').value);
    formData.append("name", this.postCarForm.get('name').value);
    formData.append("type", this.postCarForm.get('type').value);
    formData.append("color", this.postCarForm.get('color').value);
    formData.append("model", this.postCarForm.get('year').value);
    formData.append("transmission", this.postCarForm.get('transmission').value);
    formData.append("description", this.postCarForm.get('description').value);
    formData.append("price", this.postCarForm.get('price').value);
    formData.append("userId", StorageService.getUserId());

    this.service.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success(`✅ Car "${this.postCarForm.value.name}" posted successfully`);
        this.postCarForm.reset();
        this.router.navigateByUrl("/customer/dashboard");
      },
      (error) => {
        this.message.error('Please fill all fields correctly before posting.');
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage();
    }
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cdr.detectChanges(); // 👉 force Angular to refresh view immediately
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }




}
