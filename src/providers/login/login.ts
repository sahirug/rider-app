import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello LoginProvider Provider');
  }

  login(data){
    let postdata = JSON.stringify(data);
    return this.http.post('http://localhost/restaurant/api/rider/login.php', postdata);
  }

  saveToStorage(id, name){
    this.storage.set('id', id);
    this.storage.set('name', name);
  }

}
