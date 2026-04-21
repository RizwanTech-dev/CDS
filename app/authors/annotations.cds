using AdminService as service from '../../srv/admin-service';
annotate service.Authors with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'age',
                Value : age,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Authors',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Books',
            ID : 'AddBooks',
            Target : 'books/@UI.LineItem#AddBooks',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Age',
            Value : age,
        },
    ],
);

annotate service.Books with @(
    UI.LineItem #AddBooks : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : author_ID,
            Label : 'Author ID',
        },
        {
            $Type : 'UI.DataField',
            Value : cost,
            Label : 'Cost',
        },
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : 'title',
        },
        {
            $Type : 'UI.DataField',
            Value : type,
            Label : 'type',
        },
    ]
);

