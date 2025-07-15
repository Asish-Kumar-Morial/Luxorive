import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage-service';

const BASE_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CutomerService {

  constructor(private http: HttpClient) { }

  postCar(formData: any): Observable<any> {
    return this.http.post(BASE_URL + "api/customer/car", formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + "api/customer/cars", {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyCars(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/my-cars/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(BASE_URL + `api/customer/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar(id: number, carDTO: any): Observable<any> {
    return this.http.put(BASE_URL + `api/customer/car/${id}`, carDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  bidCar(formData: any): Observable<any> {
    return this.http.post(BASE_URL + "api/customer/car/bid", formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyBids(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bids/by-user/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateBidStatus(bidId: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bids/${bidId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBidByCarId(carId: number): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bids/by-car/${carId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAnalytics(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/analytics/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCar(searchDto: any): Observable<any> {
    return this.http.post(BASE_URL + "api/customer/car/search", searchDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
