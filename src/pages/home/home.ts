import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MapModalPage } from '../map-modal/map-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openMapModal(){
    let mapModal = this.modalCtrl.create(MapModalPage);
    mapModal.present();
  }

}
