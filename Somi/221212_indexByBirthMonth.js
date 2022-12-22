function indexByBirthMonth(input) {
    // 코드를 채워주세요
    let cabinet = {};
    for (let i = 0; i < input.length; i++) {
        let birthMonth = input[i].birthday.substring(5, 7);
        if (cabinet[birthMonth] === undefined) {
            cabinet[birthMonth] = [input[i]];
        } else {
            cabinet[birthMonth] = [...cabinet[birthMonth], input[i]];
        }
    }
    return cabinet;
}

indexByBirthMonth(input);
