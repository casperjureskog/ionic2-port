// import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
@ViewChild(Nav) nav: Nav;
  currentUser = undefined;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private _tokenService: Angular2TokenService) {
      this._tokenService.init({
        //apiBase: 'http://localhost:3000/api/v1'
          apiBase: 'https://building-blockz.herokuapp.com/api/v1'
      });

      this.currentUser = undefined;
      this.loginPopUp()
      this.initializeApp();
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
    test() {
      console.log('popup');
      let confirm = this.alertCtrl.create({
        title: 'Sign Up',
        inputs: [
          {
            name: 'email',
            placeholder: 'email'
          },
          {
            name: 'password',
            placeholder: 'password',
            type: 'password'
          },
          {
            name: 'passwordConfirmation',
            placeholder: 'passwordConfirmation',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sign Up',
            handler: data => {
              this.registerAccount(data);
            }
          }
        ]
      });
      confirm.present();
      this.navCtrl.push(HomePage);
    }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
    // this.openPage(HomePage);
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => {(this.currentUser = res.json().data)
          this.presentToast('User signed in.')
          this.navCtrl.push(HomePage, {
          val: 'test'
        });
      },
        err => {console.error('error')
        this.presentToast('Wrong password')

      });

  }

  registerAccount(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
      this.presentToast('User created.')
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
    this.navCtrl.push(LoginPage);
    this.presentToast('User signed out.')
  }

  presentToast(message_text) {
    let toast = this.toastCtrl.create({
      message: message_text,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
