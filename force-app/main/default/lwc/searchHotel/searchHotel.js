import { LightningElement, track, wire } from 'lwc';
import getListOfHotel from '@salesforce/apex/HotelSearchController.getListOfHotel';
import getAmenities from '@salesforce/apex/HotelSearchController.getAmenities';
import getRatings  from '@salesforce/apex/HotelSearchController.getRatings';
import getFilteredHotels from '@salesforce/apex/HotelSearchController.getFilteredHotels';

export default class SearchHotel extends LightningElement {
    @track hotelRecords;
    @track error;
    @track city;
    @track ratingOptions = [];
    @track selectedRatings = [];
    @track filteredHotels = [];
    @track amenitiesOptions = [];
    @track selectedAmenities = [];
    @track selectedPriceRange = 1000;

    @wire(getRatings)

    wiredRatings({data,error})
    {
        if(data)
        {
            this.ratingOptions = data.map(rating => ({ label: rating + ' Star', value: rating}));

    }   else if(error)
        {
        console.error('Error fetching ratings', error);
        }
    }

    @wire(getAmenities)

    wiredAmenities({data,error})
    {
        if(data)
        {
            this.amenitiesOptions = data.map(amenities => ({ label: amenities, value: amenities}));

    }   else if (error){
        console.error('Error fetching amenities', error);
    }
}

handleDestinationCity(event){
    this.city=event.target.value;
}

handleSearchHotel(){
    getListOfHotel({city:this.city})
    .then(result =>{
    this.hotelRecords = result;
    this.error=undefined;})

    .catch(error =>{
        this.error=error;
        this.hotelRecords=undefined;
    })
}

handleAmenitiesChange(event){
    this.selectedAmenities = event.detail.value;
    this.fetchFilteredHotels();
}

//Handle Checkbox Change Event

handleRatingChange(event){
    this.selectedRatings = event.detail.value;

    this.fetchFilteredHotels();
}

handleSliderChange(event) 
{
    this.selectedPriceRange = event.detail.value;
    this.fetchFilteredHotels();
}

fetchFilteredHotels(){
    getFilteredHotels({
            city:this.city,
            selectedAmenities:this.selectedAmenities,
            selectedRatings:this.selectedRatings,
            minPrice:this.selectedPriceRange
        })
        
        .then(result =>{
            this.hotelRecords = result;
            this.error=undefined;
        })
        .catch(error =>{
            this.hotelRecords = undefined;
            this.error=error.body.message;
        });

}

}