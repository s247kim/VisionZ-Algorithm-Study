import { input221212_2 } from "../Questions/221212_indexByBirthMonth";

// Write a function to index items in the array by birth month
// Array may get longer
function indexByBirthMonth() {
    const answer: any = {};

    input221212_2.forEach(person => {
        const birthMonth = new Date(person.birthday).getMonth() + 1;

        if (!answer.hasOwnProperty(birthMonth)) {
            answer[birthMonth] = [];
        }
        answer[birthMonth].push(person);
    });

    return answer;
}

console.log(indexByBirthMonth());