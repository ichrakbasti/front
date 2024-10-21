import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  readonly API_URL = 'http://localhost:8080/tickets';
  constructor(private http: HttpClient) { }

  getTicketsPerMonth() {
    return this.http.get(`${this.API_URL}/api/dashboard/total-tickets-per-month`);

  }

  getTicketsPerMarket() {
    return this.http.get(`${this.API_URL}/api/dashboard/total-tickets-per-market`);

  }

  getTotalTicketsYotpo() {
    return this.http.get(`${this.API_URL}/api/dashboard/ticket-total-stats`);

  }

  getProductivityCM(body: { start_date: string; end_date: string }) {
    return this.http.post(`${this.API_URL}/api/productivity/cm`, body);
  }

  getProductivityCustomerCare(body: { start_date: string; end_date: string }) {
    return this.http.post(`${this.API_URL}/api/productivity/customer-care`, body);
  }

}
