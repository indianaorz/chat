import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class RestService {

  constructor(private http:HttpClient) { }

  getColors() {
    return this.http.get('http://localhost:8080/FF0000/colors');
  }
}
