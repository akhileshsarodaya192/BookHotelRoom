import { LightningElement } from 'lwc';

import backgroundUrl from '@salesforce/resourceUrl/HotelReservationBackground';

export default class Information extends LightningElement {

    cities = [
        'Pune',
        'Mumbai',
        'Bangalore',
        'Delhi',
        'Ahmedabad',
        'Jabalpur',
        'Kolkata',
        'Jaipur'
        ];

        get backgroundStyle() {
                    return `height:20rem;background-image:url(${backgroundUrl});background-repeat: no-repeat;background-size: cover;`;
    }
}