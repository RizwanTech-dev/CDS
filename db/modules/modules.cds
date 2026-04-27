namespace com.capproject;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Modules : cuid, managed {

    module      : Integer;
    header      : String(100);
    subheader   : String(200);

    contentType : ContentType; // icon / src / contentText
    content     : String(500); // sap-icon://..., text, or image path

    footer      : String(100);
    route       : String(100);

    status      : UInt8; // 1 = active, 0 = inactive
}

type ContentType : String enum {
    ICON;
    IMAGE;
    TEXT;
}
