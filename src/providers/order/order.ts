import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello OrderProvider Provider');
  }

  getAppOrders(empID){
    return this.http.get('http://localhost/restaurant/api/rider/get_app_orders.php', {
      params: {
        id: empID
      }
    });
  }

  getPhoneOrders(empID){
    return this.http.get('http://localhost/restaurant/api/rider/get_phone_orders.php', {
      params: {
        id: empID
      }
    });
  }

  async getID(){
    let id: any = await this.getIDFromStorage();
    return id;
  }

  getIDFromStorage(): Promise<void>{
    return this.storage.get('id')
  }

}
