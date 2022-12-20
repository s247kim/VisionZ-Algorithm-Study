import { input221216 } from "../Questions/221216_friendCount";

// A GUID in the friends property is the GUID of a person in the list.
// Write a function to return the name of a person with the most friends.
// If there are more than 1 person with the highest friend count, return any one of them.
function findMostPopular() {
    let popularPersonName = "";
    let popularPersonFriendCount = 0;

    for (let i = 0; i < input221216.length; i++) {
        const person = input221216[i];

        if (person.friends.length >= popularPersonFriendCount) {
            popularPersonFriendCount = person.friends.length;
            popularPersonName = person.name;
        }
    }

    return popularPersonName;
}

console.log(findMostPopular());

// A GUID in the friends property is the GUID of a person in the list.
// Write a function to return the name of a person with the most male friends
// If there are more than 1 person with the highest male friend count, return any one of them.
function findPersonWithMostMaleFriends() {
    const genderMap: any = {};

    // for (let i = 0; i < input221216.length; i++) {
    //     const person = input221216[i];
    //     genderMap[person.guid] = person.gender;
    // }

    input221216.forEach(person => {
        genderMap[person.guid] = person.gender;
    });

    let highestCount = -1;
    let mostPopular = "";

    // for (let i = 0; i < input221216.length; i++) {
    //     const person = input221216[i];
    //     const friends = person.friends;
    //
    //     let maleCount = 0;
    //     for (let j = 0; j < friends.length; j++) {
    //         const friendGUID = friends[j];
    //
    //         if (genderMap[friendGUID] === 'male') {
    //             maleCount++;
    //         }
    //     }
    //
    //     if (maleCount > highestCount) {
    //         highestCount = maleCount;
    //         mostPopular = person.name;
    //     }
    // }

    input221216.forEach(person => {
        let maleCount = 0;

        person.friends.forEach(friendGUID => {
            if (genderMap[friendGUID] === "male") maleCount++;
        });

        if (maleCount > highestCount) {
            highestCount = maleCount;
            mostPopular = person.name;
        }
    });

    return mostPopular;
}

console.log(findPersonWithMostMaleFriends());