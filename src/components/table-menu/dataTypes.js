export const dataTypes = [
    {
        name: "numeric",
        types: [
            `bit`,
            `tinyint`,
            `smallint`,
            `int`,
            `bigint`,
            `decimal`,
            `numeric`,
            `float`,
            `real`
        ]
    },
    {
        name: "date",
        types: [
            `DATE`,
            `TIME`,
            `DATETIME`,
            `TIMESTAMP`,
            `YEAR`,
        ]
    },
    {
        name: "character",
        types: [
            `CHAR`,
            `NVARCHAR`,
            `NTEXT`
        ]
    },
    {
        name: "binary",
        types: [
            `BINARY`,
            `VARBINARY`,
            `IMAGE`
        ]
    },
    {
        name: "miscellaneous",
        types: [
            `CLOB`,
            `BLOB`,
            `XML`,
            `JSON`
        ]
    }
]