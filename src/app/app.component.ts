import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  onlineStatusMessage: string;
  onlineStatus: string;

  connectionStatusMessage: string;
  connectionStatus: string;
  conectinaStatusFlag = true;

  weatherIconURL = "https://openweathermap.org/img/w/";
  boolInterval = true;
  name: any;
  id: any;
  data = [
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },
    {
      name: "",
      error:"",
      weather: [{ icon: "", description: "" }],
      main: { temp: "", temp_min: "", temp_max: "" },
      coord: { lat: "", lon: "" }
    },



  ];
  img = [];
  interval: any;
  constructor(public dataService: DataService, ) {
  }

  ngOnInit(): void {

    localStorage.setItem('alldata', JSON.stringify(this.data));
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      this.conectinaStatusFlag = true;
      console.log('Online');
      setInterval(()=>{
        this.conectinaStatusFlag = false;
      },5000)
      this.repeat(this.data);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      clearInterval(this.interval);
      console.log('offline');
      this.conectinaStatusFlag = true;
      setInterval(()=>{
      this.conectinaStatusFlag = false;
      },5000)

      this.data = JSON.parse(localStorage.getItem('alldata'));
    }));
  }

  refreshData() {
    this.dataService.GetAllWeather(this.name).subscribe(
      (data: any) => {
        const filterData = this.data.findIndex(x => x.name === data.name);
        if (filterData !== -1) {
          this.data[filterData]["error"] = '';
          this.data[filterData] = data;
        } else {
          this.data[+this.id]["error"] = '';
          this.data[+this.id] = data;
        }

        if (localStorage.getItem('alldata')) {
          localStorage.clear();
          localStorage.setItem('alldata', JSON.stringify(this.data));
        }
        this.repeat(this.data);
        console.log("data", data);
      },
      response => {
        if (response.error.cod === "404") {
          this.data[+this.id]["error"] = response.error.message;
          clearInterval(this.interval);
        }
        console.log("error");
      },
      () => {
        console.log("complete");
      }
    );
  }

  edit(data) {
    this.id = data.currentTarget.id;
    this.boolInterval = false;
    this.name = data.target.value;
    const filterData = this.data.findIndex(x => x.name === data.name);
    if(filterData === -1)
    this.refreshData();
  }

  repeat(data) {
    this.boolInterval = true;
    if (this.boolInterval) {
      var interval = setInterval(() => {
        if (this.connectionStatus === 'offline') {
          clearInterval(interval);
        }
        this.data.forEach((ele, i) => {
          if (this.connectionStatus === 'offline') {
            return;
          }
          this.name = ele.name;
          if (this.name !== '') {
            this.id = i;
            this.refreshData();
          }
        });
      }, 15000);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
