import {Component} from '@angular/core'
import { HttpClient } from '@angular/common/http';


interface Currency {
    currencyCodeA: number;
    currencyCodeB: number;
    date: number;
    rateBuy: number;
    rateCross: number;
    rateSell: number;
  }

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    rateBuyUSD: number;
    rateBuyEUR:number;
    rateSellUSD:number;
    rateSellEUR:number;
    
    
    constructor(private http: HttpClient) {
        this.rateBuyUSD = 0
        this.rateBuyEUR = 0
        this.rateSellUSD = 0
        this.rateSellEUR = 0
    }
    ngOnInit() {
        this.http.get<Currency[]>('https://api.monobank.ua/bank/currency').subscribe(data => {
          console.log(data); // Вывод данных в консоль
          // Дополнительная обработка полученных данных
          const serchValueUSD = data.find(item => item.currencyCodeA === 840);
          console.log(serchValueUSD)
          const serchValueEUR = data.find(item => item.currencyCodeA === 978);
          console.log(serchValueEUR)

          if (serchValueUSD !== undefined) {
            this.rateBuyUSD = serchValueUSD.rateBuy;
          }
          if (serchValueUSD !== undefined) {
            this.rateSellUSD = serchValueUSD.rateSell;
          }

          if (serchValueEUR !== undefined) {
            this.rateBuyEUR = serchValueEUR.rateBuy;
          }

          if (serchValueUSD !== undefined) {
            this.rateSellEUR = serchValueUSD.rateSell;
          }

        });
      }

}