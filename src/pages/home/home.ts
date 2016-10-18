import { Component, OnInit } from '@angular/core';

import { NavController, ModalController, ViewController, AlertController, ToastController, Events } from 'ionic-angular';
//import {Firebase} from '../../providers/firebase/firebase'

import { Firebase } from '../../providers/firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  topic: string = '';
  db: any;
  results: string[] = [];

  constructor(public navCtrl: NavController, public firebaseService: Firebase) {

  }

  onKey(event: any) {
    this.topic = event.target.value;
  }

  ngOnInit() {
    this.SubscribeTemperatureTopic();
  }


  SubscribeTemperatureTopic() {
    this.firebaseService.getTemperatureTopicMessages.subscribe(data => {
      this.results.push(data.message);
    });
  }

  SubscribeLightTopic() {
    this.firebaseService.getLightTopicMessages.subscribe(data => {
      this.results.push(data.message);
    });
  }

  SubscribeTopic() {
    this.firebaseService.getLastTopicMessages.subscribe(data => {
      this.results.push(data.message);
    });
  }

  itemSelected(item) {
    console.log('clicou no item');
  }

  onSubscribeTopic() {
    this.results = [];
    this.firebaseService.setTopicForSubscribe(this.topic);
    this.SubscribeTopic();
    // this.SubscribeLightTopic();
  }
}