import { input221216 } from "../Questions/221216_friendCount";

function findMostPopular() {
    const people = input221216;
    const answer = {};
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < people[i]['friends'].length; j++) {
            if (people[i]["friends"][j] in answer) { // boolean
                answer[people[i]["friends"][j]] += 1;
            } else {
                answer[people[i]["friends"][j]] = 1;
            }
        }
    }

    let maxValue = 0;
    let maxId = "";

    for (const key in answer) {
        if (maxValue < answer[key]) {
            maxValue = answer[key];
            maxId = key;
        }
    }


    for (let i = 0; people.length; i++) {
        if (people[i]["guid"] === maxId) {
            return people[i]["name"];
        }
    }

}