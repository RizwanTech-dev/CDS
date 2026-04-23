using { sap.capire.literature as lit } from '../db/authors/authors';

service AuthorService {

    
    @odata.draft.enabled
    entity Authors as projection on lit.Authors;
    entity Books as projection on lit.Books;
    entity Chapters as projection on lit.Chapters;

}