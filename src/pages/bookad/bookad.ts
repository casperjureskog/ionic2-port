import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimelistsServiceProvider } from '../../providers/timelists-service/timelists-service';
import { BookingsService } from '../../providers/bookings-service/bookings-service';
/**
 * Generated class for the BookadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookad',
  templateUrl: 'bookad.html',
  providers:[TimelistsServiceProvider,
            BookingsService]

})
export class BookadPage {
  timelists: any;

  constructor(public navCtrl: NavController, private timelistsServiceProvider:TimelistsServiceProvider, private bookingsService: BookingsService) {
    this.getTimelists();
}

getTimelists(){
  this.timelistsServiceProvider.getTimelists()
    .then(data => {
      // console.log(data);
      this.timelists = data;
    });
}

deleteBookings(id, ids){
  console.log(id, ids);
  this.bookingsService.deleteBookings(id, ids)
this.navCtrl.push(BookadPage, {
id: id
})
}
}