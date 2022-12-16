function indexByBirthMonth(input) {
    const answer = {};

    for (let i = 0; i < input.length; i++) {
        const person = input[i];
        const birthMonth = new Date(person.birthday).getMonth() + 1;

        if (!answer.hasOwnProperty(birthMonth)) {
            answer[birthMonth] = [];
        }
        answer[birthMonth].push(person);
    }

    return answer;
}
