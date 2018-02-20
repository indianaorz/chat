import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import {DataService} from '../data.service';
import { NgZone, Injectable, Optional } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('* => *',[
        query(':enter',style({opacity:0}), {optional:true}),

        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform: 'translateY(-75%)',offset: 0}),
            style({opacity: .5, transform: 'translateY(20%)',offset: .5}),
            style({opacity: 1, transform: 'translateY(0)',offset: 1})
          ]))]), {optional:true}),
          
          query(':leave',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform: 'translateY(0)',offset: 0}),
            style({opacity: .5, transform: 'translateY(20%)',offset: .5}),
            style({opacity: 0, transform: 'translateY(-75%)',offset: 1})
          ]))]), {optional:true})
      ])
    ])
  ]
})





export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item'
  goalText: string = "My first life goal"
  goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i){
    this.goals.splice(i,1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  connect() {
      var socket = new SockJS('/gs-guide-websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
          setConnected(true);
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/greetings', function (greeting) {
              showGreeting(JSON.parse(greeting.body).content);
          });
      });
  }



//LOGIN STUFF
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '200903196469-ahi3r9cmjl7aces89h7bc5aa50qco662.apps.googleusercontent.com',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
        this.googleInit();
  }

  //SIGNING OUT
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}
