import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface ExchangeRates {
  [currency: string]: {
    [currency: string]: number;
  };
}

interface Currency {
    currencyCodeA: number;
    currencyCodeB: number;
    date: number;
    rateBuy: number;
    rateCross: number;
    rateSell: number;
  }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
    rateBuyUSD: number;
    rateBuyEUR:number;


    constructor(private http: HttpClient) {
        this.rateBuyUSD = 0
        this.rateBuyEUR = 0
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

          if (serchValueEUR !== undefined) {
            this.rateBuyEUR = serchValueEUR.rateBuy;
          }

        });
      }
      

      

  selectedCurrency: string = 'UAH';
  inputValue: number = 0;
  convertedValue: number = 0;
  currencies = ['USD', 'EUR', 'UAH'];
  selectedCurrency2: string = 'UAH';
  inputValue2: number = this.inputValue;

  

  convertCurrency() {

    const exchangeRates: ExchangeRates = {
      USD: {
        UAH: 1 / this.rateBuyUSD,
        EUR: this.rateBuyEUR / this.rateBuyUSD, 
        USD: 1
      },
      EUR: {
        UAH: 1 / this.rateBuyEUR,
        USD: this.rateBuyUSD / this.rateBuyEUR,
        EUR: 1
      },
      UAH: {
        USD: this.rateBuyUSD,
        EUR: this.rateBuyEUR,
        UAH: 1
      }
    };

    const rate = exchangeRates[this.selectedCurrency][this.selectedCurrency2];
    this.convertedValue = this.inputValue / rate;


  }
  convertBackCurrency() {
    const exchangeRates: ExchangeRates = {
        USD: {
          UAH: 1 / this.rateBuyUSD,
          EUR: this.rateBuyEUR / this.rateBuyUSD,
          USD: 1
        },
        EUR: {
          UAH: 1 / this.rateBuyEUR,
          USD: this.rateBuyUSD / this.rateBuyEUR ,
          EUR: 1
        },
        UAH: {
          USD: this.rateBuyUSD,
          EUR: this.rateBuyEUR,
          UAH: 1
        }
      };
    const reverseRate = exchangeRates[this.selectedCurrency2][this.selectedCurrency];
    this.inputValue = this.convertedValue / reverseRate;
  }
  
}
