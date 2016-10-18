import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ReplaySubject } from 'rxjs/ReplaySubject';
declare var firebase: any;


/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Firebase {

  public subTemperatureRef: any;
  public subLightRef: any;
  public databaseRef: any;
  public db: any;

  public replaySubjectTemperature: any;
  public replaySubjectLight: any;
  public replaySubject: any;

  constructor(public http: Http) {

    this.subTemperatureRef = firebase.database().ref('subscribe/test/temperature');
    this.subLightRef = firebase.database().ref('subscribe/test/light');

    this.subTemperatureRef.on('child_added', this.handleTemperatureTopicChildAdded, this);
    this.subLightRef.on('child_added', this.handleLightTopicChildAdded, this);

    this.replaySubjectTemperature = new ReplaySubject();
    this.replaySubjectLight = new ReplaySubject();
    this.replaySubject = new ReplaySubject();
  }

  getChildInstance(path: string) {
    this.db = firebase.database().ref(path);
    return this.db;
  }

  setTopicForSubscribe(topic: string) {
    this.databaseRef = firebase.database().ref('subscribe/' + topic);
    this.databaseRef.on('child_added', this.handleTopicChildAdded, this);
  }

  handleTemperatureTopicChildAdded(snap) {
    try {
      // Tell our observer we have new data 
      this.replaySubjectTemperature.next(snap.val());
    } catch (error) {
      console.log('catching', error);
    }
  }

  handleLightTopicChildAdded(snap) {
    try {
      // Tell our observer we have new data 
      this.replaySubjectLight.next(snap.val());
    } catch (error) {
      console.log('catching', error);
    }
  }

  handleTopicChildAdded(snap) {
    try {
      this.replaySubject.next(snap.val());
    } catch (error) {
      console.log('catching', error);
    }
  }

  get getLastTopicMessages() {
    return this.replaySubject;
  }

  get getLightTopicMessages() {
    return this.replaySubjectLight;
  }

  get getTemperatureTopicMessages() {
    return this.replaySubjectTemperature;
  }




}
