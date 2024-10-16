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
}
