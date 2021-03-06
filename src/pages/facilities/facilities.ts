import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { FacilitiesService } from '../../providers/facilities-service/facilities-service';
import { BookPage } from '../book/book';
import { DatePicker } from '@ionic-native/date-picker';
import { HomePage } from '../home/home';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-facilities',
  templateUrl: 'facilities.html',
  providers:[FacilitiesService],

})
export class FacilitiesPage {
  facilities: any;
  picker: any;
  colNr: boolean;
  data: any;


  constructor(public navCtrl: NavController,
              private facilitiesService:FacilitiesService,
              private datePicker: DatePicker) {
                this.getFacilities();
              }


getFacilities(){
  this.facilitiesService.getFacilities()
  .then(data => {
    this.facilities = data;
    if (data) {
      this.colNr = true;
    }
  });
}

buttonSize(f_nr) {
  if (f_nr) {
    return {height: '130px' ,width: '130px'}
  } else {
    return {height: '200px' ,width: '200px'}
  }
}


pickers(id){
this.datePicker.show({
  date: new Date(),
  mode: 'date',
  minDate: moment().locale('de').add(0, 'days').toDate(),
  maxDate: moment().locale('de').add(7, 'days').toDate(),
}).then(
  date => this.navCtrl.push(BookPage, {
    date: date, id: id}),
  err => console.log('Error occurred while getting date: ', err)
);
}

go_to_home(){
  this.navCtrl.push(HomePage, {
  val: 'test'
  })
}
}
