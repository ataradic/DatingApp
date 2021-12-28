import { IStatus, Status } from './IEnumStatus';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//status = 1;
  registerMode = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  constructor(private http: HttpClient) { }

  updateregisterModel(event: any) {
    this.registerMode = event;
  }
  
  ngOnInit(): void {
    
  }

}
