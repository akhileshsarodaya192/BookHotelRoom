import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ThankYouPage extends NavigationMixin(LightningElement) {
    handleBack(){

        let cmpDef = {
            componentDef: "c:wizardPage"
        };

        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: "/one/one.app#" + encodedDef
            }
        });
    }
}