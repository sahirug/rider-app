import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MapModalPage } from '../map-modal/map-modal';

import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public empID: any = '';
  public appOrders: any = [];
  public phoneOrders: any = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public orderProvider: OrderProvider) {

  }

  ionViewDidLoad(){
    this.getAppOrders();
    this.getPhoneOrders();
  }

  async getAppOrders(){
    this.empID = await this.orderProvider.getID();
    this.orderProvider.getAppOrders(this.empID)
      .subscribe(data => {
        this.appOrders = data;
        console.log(this.appOrders);
      }, err => {
        console.log(err);
      });
  }

  async getPhoneOrders(){
    this.empID = await this.orderProvider.getID();
    this.orderProvider.getPhoneOrders(this.empID)
      .subscribe(data => {
        this.phoneOrders = data;
        console.log(this.phoneOrders.error);
        if(this.phoneOrders.error !== undefined){
          console.log('undefined');
          this.phoneOrders = [];
        }
      }, err => {
        console.log(err);
      });
  }

  openMapModal(){
    let mapModal = this.modalCtrl.create(MapModalPage);
    mapModal.present();
  }

}
