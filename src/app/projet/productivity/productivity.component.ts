import { Component } from '@angular/core';
import {CardComponent} from "../../theme/shared/components/card/card.component";
import {HttpClient} from "@angular/common/http";
import {TicketsService} from "../../services/tickets.service";
import {ChartDB} from "../../fack-db/chartData";
import {CommonModule, DecimalPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-productivity',
  standalone: true,
  imports: [
    CardComponent,
    DecimalPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './productivity.component.html',
  styleUrl: './productivity.component.scss'
})
export class ProductivityComponent {

  prodUserCM: any[] = [];
  prodUserCustomerCare: any[] = [];
  dateDebutCM: string = '';  // Initialise avec une chaîne vide
  dateFinCM: string = '';    // Initialise avec une chaîne vide
  dateDebut: string = '';  // Initialise avec une chaîne vide
  dateFin: string = '';    // Initialise avec une chaîne vide

  constructor(private http: HttpClient, private ticketsService: TicketsService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmitCM() {
    const body = {
      start_date: this.dateDebutCM,  // La date de début sélectionnée
      end_date: this.dateFinCM       // La date de fin sélectionnée
    };
    this.ticketsService.getProductivityCM(body).subscribe((UserCM: any) => {
      console.log(UserCM)
      this.prodUserCM = UserCM;
    });
  }

  onSubmitCustomerCare() {
    const body = {
      start_date: this.dateDebut,  // La date de début sélectionnée
      end_date: this.dateFin       // La date de fin sélectionnée
    };
    this.ticketsService.getProductivityCustomerCare(body).subscribe((UserCustomercare: any) => {
      this.prodUserCustomerCare = UserCustomercare;
    });
  }
  getData(): void {
    const body = {
      start_date: '',
      end_date: ''
    };
    this.ticketsService.getProductivityCM(body).subscribe((UserCM: any) => {
      console.log(UserCM)
      this.prodUserCM = UserCM;
    });
    this.ticketsService.getProductivityCustomerCare(body).subscribe((UserCustomercare: any) => {
      this.prodUserCustomerCare = UserCustomercare;
    });
  }

}
