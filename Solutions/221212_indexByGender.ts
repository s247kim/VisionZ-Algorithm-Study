import { input221212_1 } from "../Questions/221212_indexByGender";

// Write a function to index items in the array by gender
// Array may get longer
function indexByGender() {
    const output: any = { male: [], female: [] };

    input221212_1.forEach(person => {
        if (person.gender === "male") {
            output.male.push(person);
        } else {
            output.female.push(person);
        }
    });

    return output;
}

console.log(indexByGender());