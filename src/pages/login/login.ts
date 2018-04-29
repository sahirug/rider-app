import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginProvider } from '../../providers/login/login';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(-2000px,0,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertCtrl: AlertController) {

      this.loginForm = this.formBuilder.group({
        empID: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let authenticateLoader = this.loadingController.create({
      content: 'Authenticating'
    });
    authenticateLoader.present();
    if(this.loginForm.valid){
      this.loginProvider.login(this.loginForm.value)
        .subscribe((data) => {
          let response: any = data;
          if(response.error == undefined){
            this.loginProvider.saveToStorage(response.id, response.name);
            this.navCtrl.setRoot(HomePage);
          }else{
            let errorAlert = this.alertCtrl.create({
              title: 'Error',
              message: response.error,
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            errorAlert.present();
          }
          authenticateLoader.dismiss();
        }, err => {
          console.log(err);
          authenticateLoader.dismiss();
        });
    }else{
      authenticateLoader.dismiss();
      let missingAlert = this.alertCtrl.create({
        title: 'Missing fields',
        message: 'Please complete all fields',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      missingAlert.present();
    }
  }

}
