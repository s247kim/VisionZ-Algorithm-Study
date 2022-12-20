const input221212_1 = [
    {
        _id: "639767b7a889387682fbdc3f",
        name: "Reed Rosales",
        gender: "male",
        birthday: "1984-05-08",
        company: "TYPHONICA",
        email: "reedrosales@typhonica.com",
        phone: "+1 (992) 465-3684",
    },
    {
        _id: "639767b71c119cab969e675e",
        name: "Whitfield Cruz",
        gender: "male",
        birthday: "1981-05-26",
        company: "INDEXIA",
        email: "whitfieldcruz@indexia.com",
        phone: "+1 (822) 419-3684",
    },
    {
        _id: "639767b7a0cdb51c558ee42e",
        name: "Anastasia Roy",
        gender: "female",
        birthday: "1988-02-19",
        company: "NEWCUBE",
        email: "anastasiaroy@newcube.com",
        phone: "+1 (996) 438-2895",
    },
    {
        _id: "639767b71352eb56cfd5fc34",
        name: "Hardy Burns",
        gender: "male",
        birthday: "1980-12-04",
        company: "EGYPTO",
        email: "hardyburns@egypto.com",
        phone: "+1 (971) 508-3552",
    },
    {
        _id: "639767b713e5b48fee3be64f",
        name: "Holcomb Herring",
        gender: "male",
        birthday: "2001-08-05",
        company: "EXOPLODE",
        email: "holcombherring@exoplode.com",
        phone: "+1 (824) 457-2159",
    },
];

function indexByGender(input) {
    let output = { male: [], female: [] };

    for (let i = 0; i < input.length; i++) {
        if (input[i].gender === "male") {
            output["male"].push(input[i]);
        } else {
            output["female"].push(input[i]);
        }
    }

    return output;
}

console.log(indexByGender(input221212_1));
