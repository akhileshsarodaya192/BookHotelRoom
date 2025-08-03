public with sharing class HotelSearchController {

    @AuraEnabled(cacheable=true)

    public static List<Search_Hotel__c> getListOfHotel(String city){

        String cityLike ='%'+city+'%';
    
        return [SELECT Id, Name, City__c, Price__c, Rating__c, Amenities__c FROM Search_Hotel__c WHERE City__c LIKE: cityLike];
    }

    @AuraEnabled(cacheable=true)
    
    public static List<String> getRatings(){
        List<String> ratings = new List<String>();
    
    // Fetch distinct ratings from Search_Hotel__c object

    for (AggregateResult aggregate: [SELECT Rating__c FROM Search_Hotel__c WHERE Rating__c != null GROUP BY Rating__c ]) {
        
        ratings.add(String.valueOf(aggregate.get('Rating__c')));
    }

    return ratings;

    }

    @AuraEnabled(cacheable=true)

    public static List<String> getAmenities(){

    List<String> amenities = new List<String>();

    //Fetch distinct amenities from Search_Hotel__c object

    for (AggregateResult aggregate: [SELECT Amenities__c FROM Search_Hotel__c WHERE Amenities__c != null GROUP BY Amenities__c]) {

        amenities.add(String.valueOf(aggregate.get('Amenities__c')));
    
    }

    return amenities;

}

@AuraEnabled(cacheable=true)

public static List<Search_Hotel__c> getFilteredHotels(String city, List<String> selectedAmenities, List<String> selectedRatings, Integer minPrice){

    if((selectedAmenities == null || selectedAmenities.isEmpty()) && (selectedRatings == null || selectedRatings.isEmpty())) 
    {
        //If no Ratings, Amenities are selected
        return [SELECT Id, Name, City__c, Price__c, Rating__c, Amenities__c FROM Search_Hotel__c WHERE City__c =: city AND Price__c >= :minPrice 
                AND Price__c <= 15000];
    
    }

    if(selectedAmenities == null || selectedAmenities.isEmpty()) 
    {
    // If no Amenities are selected
    return [SELECT Id, Name, City__c, Price__c, Rating__c, Amenities__c FROM Search_Hotel__c WHERE City__c =: city AND Rating__c IN :selectedRatings 
            AND Price__c >= :minPrice AND Price__c <= 15000];
    }

    if(selectedRatings == null || selectedRatings.isEmpty()) 
    {
        //If no Ratings are selected
    return [SELECT Id, Name, City__c, Price__c, Rating__c, Amenities__c FROM Search_Hotel__c WHERE City__c =: city AND Amenities__c IN :selectedAmenities 
           AND Price__c >= :minPrice AND Price__c <= 15000];
    }

    //Fetch Hotels Based on All filters

    return [SELECT Id, Name, City__c, Price__c, Rating__c, Amenities__c FROM Search_Hotel__c WHERE City__c =: city AND Amenities__c IN :selectedAmenities 
            AND Rating__c IN :selectedRatings AND Price__c >=: minPrice AND Price__c <= 15000];
}

}