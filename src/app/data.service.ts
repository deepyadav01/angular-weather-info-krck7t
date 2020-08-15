import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  weatherIconURL = 'https://openweathermap.org/img/w/';
  weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherParams = '&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534';

  constructor(public http: HttpClient) { }

  GetAllWeather(name): Observable<any> {
    const url = `${this.weatherAPI}${name}${this.weatherParams}`;
    return this.http.get(url);
  }
}