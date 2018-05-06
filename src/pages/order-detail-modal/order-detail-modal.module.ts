import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailModalPage } from './order-detail-modal';

@NgModule({
  declarations: [
    OrderDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailModalPage),
  ],
})
export class OrderDetailModalPageModule {}
