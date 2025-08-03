public with sharing class ReservationController {

    @AuraEnabled(cacheable=true)

    public static List<Reservation__c> getReservations(){
        return [SELECT Id, Name, Date_of_Reservation__c, Check_in_Date__c, Check_out_Date__c, Email_Id__c, Phone__c, Status__c, Room_Name__c FROM Reservation__c];
    }

    @AuraEnabled(cacheable=true)

    public static List<Customer__c> getCustomers(){
        return [SELECT Id, Name, Aadhar_Card_Number__c, Email_Id__c, Phone__c FROM Customer__c];
    }
}