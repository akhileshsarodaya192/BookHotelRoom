import { LightningElement, track } from 'lwc';

import getReservations from '@salesforce/apex/ReservationController.getReservations';
import getCustomers from '@salesforce/apex/ReservationController.getCustomers';

export default class Dashboard extends LightningElement {

@track reservations = [];

@track customers = [];

@track showReservation = false;

@track showCustomer = false;

getReservations(){
    getReservations()

    .then(result => {

        this.reservations = result;

        this.showReservation = true;
})

    .catch(error => {
        console.error(error);
    });
}

getCustomers() {
    getCustomers()

    .then(result => {

        this.customers = result;

        this.showCustomer = true;
    })
    
    .catch(error => {
        console.error(error);
    });
}

hideCustomerData(){
    this.showCustomer = false;
}

hideReservationData(){
    this.showReservation = false;
}
}