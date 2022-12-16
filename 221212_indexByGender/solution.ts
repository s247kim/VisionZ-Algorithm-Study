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