// angular import
import { Component, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {ApexOptions, ApexTheme, NgApexchartsModule} from 'ng-apexcharts';
import { ProductSaleComponent } from './product-sale/product-sale.component';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexMarkers
} from 'ng-apexcharts';
import {HttpClient} from "@angular/common/http";
import {TicketsService} from "../../services/tickets.service";
import {ChartDB} from "../../fack-db/chartData";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  markers: ApexMarkers;
  theme: ApexTheme;
};


@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule, ProductSaleComponent],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('customerChart') customerChart!: ChartComponent;
  data: any;
  chartDB: any;
  ticketsPerMonth: any[] = [];
  bar2CAC: ApexOptions;
  bar2CACOfMarket: ApexOptions;

  // constructor
  constructor(private http: HttpClient, private ticketsService: TicketsService) {

    this.chartDB = ChartDB;
    this.bar2CAC = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      // colors: ['#4099ff', '#0e9e4a', '#FFB64D', '#FF5370','#81C784','#0e9e4a','#B0BEC5'],
      colors: ['#4099ff', '#0e9e4a', '#FFB64D', '#FF5370', '#81C784', '#5C6BC0', '#4DB6AC', '#FFD180', '#B0BEC5', '#FF8A80'],

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      series: [],
      xaxis: {},
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
    this.bar2CACOfMarket = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      // colors: ['#4099ff', '#0e9e4a', '#FFB64D', '#FF5370','#81C784','#0e9e4a','#B0BEC5'],
      colors: ['#4099ff', '#0e9e4a', '#FFB64D', '#FF5370', '#81C784', '#5C6BC0', '#4DB6AC', '#FFD180', '#B0BEC5', '#FF8A80'],

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      series: [],
      xaxis: {},
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
    this.data = [];
  }
  cards = [
    {
      background: 'bg-c-blue',
      title: 'Orders Received',
      icon: 'icon-shopping-cart',
      text: 'Completed Orders',
      number: '486',
      no: '351'
    }
    // {
    //   background: 'bg-c-yellow',
    //   title: 'Revenue',
    //   icon: 'icon-repeat',
    //   text: 'This Month',
    //   number: '$42,56',
    //   no: '$5,032'
    // },
    // {
    //   background: 'bg-c-red',
    //   title: 'Total Profit',
    //   icon: 'icon-shopping-cart',
    //   text: 'This Month',
    //   number: '$9,562',
    //   no: '$542'
    // }
  ];

  images = [
    {
      src: 'assets/images/gallery-grid/img-grd-gal-1.jpg',
      title: 'Old Scooter',
      size: 'PNG-100KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-2.jpg',
      title: 'Wall Art',
      size: 'PNG-150KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-3.jpg',
      title: 'Microphone',
      size: 'PNG-150KB'
    }
  ];

  ngOnInit(): void {
    this.getData();

  }

  getData(): void {
    this.ticketsService.getTicketsPerMonth()
      .subscribe((ticketsPerMonth: any) => {
        this.bar2CAC.series = ticketsPerMonth.series;
        this.bar2CAC.xaxis = ticketsPerMonth.xaxis;
        console.log('Données reçues :',  ticketsPerMonth);
      });

    this.ticketsService.getTicketsPerMarket()
      .subscribe((ticketsPerMonth: any) => {
        this.bar2CACOfMarket.series = ticketsPerMonth.series;
        this.bar2CACOfMarket.xaxis = ticketsPerMonth.xaxis;
        console.log('Données reçues :',  ticketsPerMonth);
      });

    this.ticketsService.getTotalTicketsYotpo()
      .subscribe((response: any) => { // Utilisation de 'any' pour simplifier
        this.cards = [
          {
            background: 'bg-c-blue',
            title: 'Tickets Reçus',
            icon: 'icon-shopping-cart',
            text: 'Total tickets reçus',
            number: response.total_received.toString(), // Conversion en string
            no: '1'
          },
          {
            background: 'bg-c-purple',
            title: 'Tickets Traités',
            icon: 'icon-command',
            text: 'Total tickets traités',
            number: response.total_processed.toString(),
            no: '2'
          },
          {
            background: 'bg-c-yellow',
            title: 'Tickets Email',
            icon: 'icon-voicemail',
            text: 'Total tickets email',
            number: response.total_email.toString(),
            no: '3'
          },
          {
            background: 'bg-c-red',
            title: 'Tickets Chat',
            icon: 'icon-tablet',
            text: 'Total tickets chat',
            number: response.total_chat.toString(),
            no: '4'
          },
          {
            background: 'bg-c-green',
            title: 'Tickets WhatsApp',
            icon: 'icon-smartphone',
            text: 'Total tickets WhatsApp',
            number: response.total_whatsapp.toString(),
            no: '5'
          }
        ];
        console.log('Total des tickets reçus:', response);
      });



  }
}
