import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  console.log(navParams.get('val'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  go_to_home(){
    this.navCtrl.push(HomePage, {
    val: 'test'
    })
  }

}
