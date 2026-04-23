using AuthorService as service from '../../srv/authors-service';

annotate service.Authors with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'age',
                Value: age,
            },
        ],
    },
    UI.Facets                    : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Books',
            ID    : 'Books',
            Target: 'books/@UI.LineItem#Books',
        },
    ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'age',
            Value: age,
        },
    ],
);

annotate service.Books with @(UI.LineItem #Books: [
    {Value: title},
    {Value: type},
    {Value: cost},
]);

annotate service.Books with @UI.CreateHidden;