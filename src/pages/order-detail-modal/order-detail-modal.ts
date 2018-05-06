import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the OrderDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail-modal',
  templateUrl: 'order-detail-modal.html',
})
export class OrderDetailModalPage {

  public orderDetails: any;
  public meals: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public orderProvider: OrderProvider) {
      this.orderDetails = this.navParams.get('orderDetails');
  }

  ionViewDidLoad() {
    this.loadMeals();
    console.log('ionViewDidLoad OrderDetailModalPage');
  }

  loadMeals(){
    this.orderProvider.getMeals(this.orderDetails.orderID, this.orderDetails.orderType)
      .subscribe(data => {
        this.meals = data;
      }, err => {
        console.log(err);
      });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
}
