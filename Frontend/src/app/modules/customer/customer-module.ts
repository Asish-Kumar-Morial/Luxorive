import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing-module';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';
import { PostCar } from './components/post-car/post-car';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MyCars } from './components/my-cars/my-cars';
import { UpdateCar } from './components/update-car/update-car';
import { BookCar } from './components/book-car/book-car';
import { MyBids } from './components/my-bids/my-bids';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ManageBids } from './components/manage-bids/manage-bids';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SearchCar } from './components/search-car/search-car';


@NgModule({
  declarations: [
    CustomerDashboard,
    PostCar,
    MyCars,
    UpdateCar,
    BookCar,
    MyBids,
    ManageBids,
    SearchCar
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzGridModule,
    NzTableModule,
    NzCardModule
  ]
})
export class CustomerModule { }
