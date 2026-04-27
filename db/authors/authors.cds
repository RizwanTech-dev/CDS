namespace sap.capire.literature;

using {
    Currency,
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';

entity Authors : cuid {
    name    : String  @mandatory;
    age     : Integer;
    gender  : Gender;

    books   : Composition of many Books
                  on books.author = $self;

    hideAge  : Boolean @Core.Computed;
}

entity Books : cuid, managed {
    title    : String;
    type     : String;
    cost     : Decimal(11, 2);
    currency : Currency;
    status   : Integer enum {
        notStarted = 1;
        Started = 2;
        completed = 3;
        shipped = 4;
        sold = 4;
        cancelled = 0;
    }

    author   : Association to Authors; //Managed association

    Chapters : Composition of many Chapters
                   on Chapters.book = $self;
}

entity Chapters : cuid {
    chapterName : String;

    book        : Association to Books;

}


// custom types
type Gender : String enum {
    male;
    female;
    non_binary = 'non-binary';
}