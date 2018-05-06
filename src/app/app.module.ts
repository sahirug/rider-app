import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapModalPage } from '../pages/map-modal/map-modal';
import { OrderDetailModalPage } from '../pages/order-detail-modal/order-detail-modal';
import { LoginProvider } from '../providers/login/login';
import { OrderProvider } from '../providers/order/order';
import { LogoutProvider } from '../providers/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MapModalPage,
    OrderDetailModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MapModalPage,
    OrderDetailModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    OrderProvider,
    LogoutProvider
  ]
})
export class AppModule {}
