import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import backgroundUrl1 from '@salesforce/resourceUrl/HotelReservationHotel1';
import backgroundUrl2 from '@salesforce/resourceUrl/HotelReservationHotel2';
import { NavigationMixin } from 'lightning/navigation';

export default class HotelManagement extends NavigationMixin(LightningElement) {

    recordId;

    handleSubmit(event){
            console.log('onsubmit event recordEditform'+ event.detail.fields);
    }

    handleSuccess(){
        const even = new ShowToastEvent({

            title:'Success!',

            message: 'Room Booked! Enjoy Your Stay at Premium Hotels!!',

            variant: 'success'
        });

        this.dispatchEvent(even);

        let cmpDef = {
            componentDef : "c:thankYouPage"
        };

        let encodedDef = btoa(JSON.stringify(cmpDef));

        this[NavigationMixin.Navigate]({

            type: "standard__webPage",

            attributes: {
                url: "/one/one.app#" +encodedDef
            }
        });
    }

    get backgroundStyle1(){
        return `height 50rem;background-image:url(${backgroundUrl1});background-repeat:no-repeat;background-size:cover`; 
        
    }
    get backgroundStyle2(){
        return `height 50rem;background-image:url(${backgroundUrl2});background-repeat:no-repeat;background-size:cover`; 
        
    }
}