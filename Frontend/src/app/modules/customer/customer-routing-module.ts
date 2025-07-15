import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';
import { PostCar } from './components/post-car/post-car';
import { MyCars } from './components/my-cars/my-cars';
import { UpdateCar } from './components/update-car/update-car';
import { BookCar } from './components/book-car/book-car';
import { MyBids } from './components/my-bids/my-bids';
import { ManageBids } from './components/manage-bids/manage-bids';
import { SearchCar } from './components/search-car/search-car';

const routes: Routes = [
  { path: "dashboard", component: CustomerDashboard },
  { path: "post-car", component: PostCar },
  { path: "my-cars", component: MyCars },
  { path: "car/edit/:id", component: UpdateCar },
  { path: "car/:id/book", component: BookCar },
  { path: "my-bids", component: MyBids },
  { path: "manage-bids/:id", component: ManageBids },
  { path: "search-car", component: SearchCar }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
