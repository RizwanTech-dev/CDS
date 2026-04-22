namespace sap.capire.literature;

using { Currency,cuid,managed,sap.common.CodeList } from '@sap/cds/common';

entity Authors :cuid{
    name:String;
    age:Integer;

    books:Composition of many Books on books.author =$self; 
}

entity Books:cuid,managed{
    title: String;
    type : String;
    cost : Decimal(11,2);
    currency:Currency;

    author: Association to Authors; //Managed association
   
    Chapters: Composition of many Chapters on Chapters.book = $self;
}

entity Chapters:cuid{
     chapterName : String;

     book: Association to Books;
    
}