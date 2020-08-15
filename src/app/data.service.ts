import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  weatherIconURL = 'https://openweathermap.org/img/w/';
  weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherParams = '&units=metric&APPID=f92c1f4990b0574d4a4e4d3dd556f388';

  constructor(public http: HttpClient) { }

  GetAllWeather(name): Observable<any> {
    const url = `${this.weatherAPI}${name}${this.weatherParams}`;
    return this.http.get(url);
  }
}