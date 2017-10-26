import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider/http-provider';
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers:[HttpProvider]

})
export class NewsPage {
  news: any;

  constructor(public navCtrl: NavController, private httpProvider:HttpProvider) {
    this.getNews();
}
getNews(){
  this.httpProvider.getNews()
    .then(data => {
      console.log(data);
      this.news = data;
    });


}

}