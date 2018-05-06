import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MapModalPage } from '../map-modal/map-modal';
import { LoginPage } from '../login/login';
import { OrderDetailModalPage } from '../order-detail-modal/order-detail-modal';

import { OrderProvider } from '../../providers/order/order';
import { LogoutProvider } from '../../providers/logout/logout';

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
    public orderProvider: OrderProvider,
    public logoutProvider: LogoutProvider,
    public loadingController: LoadingController,
    public alertCtrl: AlertController) {

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
        if(this.appOrders.error !== undefined){
          this.appOrders = [];
        }
      }, err => {
        console.log(err);
      });
  }

  async getPhoneOrders(){
    this.empID = await this.orderProvider.getID();
    this.orderProvider.getPhoneOrders(this.empID)
      .subscribe(data => {
        this.phoneOrders = data;
        if(this.phoneOrders.error !== undefined){
          this.phoneOrders = [];
        }
      }, err => {
        console.log(err);
      });
  }

  openMapModal(orderID, coords){
    let orderDetails = {
      lat: coords.lat,
      lng: coords.lng,
      orderID: orderID
    }
    let mapModal = this.modalCtrl.create(MapModalPage, orderDetails);
    mapModal.present();
  }

  confirmComplete(orderID, orderType){
    let confirmAlert  = this.alertCtrl.create({
      title: 'Complete Order',
      message: 'Confirm completion of order?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.completeOrder(orderID, orderType);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirmAlert.present();
  }

  openOrderDetailModal(orderID, orderType, address = null){
    let orderDetails = {
      orderID: orderID,
      orderType: orderType,
      address: address
    };
    let orderDetailModal = this.modalCtrl.create(OrderDetailModalPage, {
      orderDetails: orderDetails
    });
    orderDetailModal.present();
  }

  completeOrder(orderID, orderType){
    let updateLoader = this.loadingController.create({
      content: 'Updating'
    });
    updateLoader.present();
    this.orderProvider.completeOrder(orderID, orderType)
      .subscribe(data => {
        console.log(data);
        orderType == 'app' ? this.getAppOrders() : this.getPhoneOrders();
        updateLoader.dismiss();
      }, err => {
        console.log(err);
        updateLoader.dismiss();
      });
  }

  logout(){
    let logoutLoader = this.loadingController.create({
      content: 'Logging out'
    });
    logoutLoader.present();
    this.logoutProvider.logout();
    logoutLoader.dismiss();
    this.navCtrl.setRoot(LoginPage);
  }

}
