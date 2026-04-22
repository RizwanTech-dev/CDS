using { sap.capire.literature as lit } from '../db/schema';


service AdminService {

    entity Products{
        key ID:Integer;
        title:String(111);
        descr:String(1111);
    }

    @odata.draft.enabled
    entity Authors as projection on lit.Authors;
    // entity Authors as projection on lit.Authors{
    //     *,
    //     books: Composition of many Books on books.author = $self
    // };

    entity Books as projection on lit.Books;
    entity Chapters as projection on lit.Chapters;

}