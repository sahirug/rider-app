import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public destinationLat: any;
  public destinationLng: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  public orderID: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public geolocation: Geolocation,
    public loadingController: LoadingController) {
      this.destinationLat = parseFloat(this.navParams.get('lat'));
      this.destinationLng = parseFloat(this.navParams.get('lng'));
      console.log(this.navParams.get('orderID'));
      this.orderID = this.navParams.get('orderID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapModalPage');
    this.initMap();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  initMap() {
    let locationLoader = this.loadingController.create({
      content: 'Getting location and mapping route'
    });
    locationLoader.present();
    this.geolocation.getCurrentPosition().then((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: {lat: lat, lng: lng}
      });

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: '../assets/imgs/motorbike.png',
        position: this.map.getCenter()
      });

      this.directionsDisplay.setMap(this.map);
      this.calculateAndDisplayRoute(position);
      locationLoader.dismiss();
    });
  }

  calculateAndDisplayRoute(position) {
    this.directionsService.route({
      origin: {lat: position.coords.latitude, lng: position.coords.longitude},
      destination: {lat: this.destinationLat, lng: this.destinationLng},
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
