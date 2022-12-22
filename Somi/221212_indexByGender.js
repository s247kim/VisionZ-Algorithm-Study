function indexByGender(input) {
    // 코드를 채워주세요
    let maleInfo = input.filter((person) => person.gender === "male");
    let femaleInfo = input.filter((person) => person.gender === "female");
    let output = { male: maleInfo, female: femaleInfo };
    return output;
}

indexByGender(input);
