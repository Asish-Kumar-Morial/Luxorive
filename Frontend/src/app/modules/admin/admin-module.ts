import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { GetBookings } from './components/get-bookings/get-bookings';
import { SearchCar } from './components/search-car/search-car';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    AdminDashboard,
    GetBookings,
    SearchCar
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzSpinModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
  ]
})
export class AdminModule { }
