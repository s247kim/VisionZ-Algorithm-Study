function findPersonWithMostMaleFriends(people) {
    // friends 배열 돌면서 people[i].guid랑 일치하는 사람 찾고 성별 식별
    // 성별이 male이면 카운트 올리고 아니면 패스
    // 모두의 male 카운트 비교해 maxCount 가진 인덱스의 이름 리턴
    // for (let i = 0; i < people.length; i++) {
    // 		people[i].maleFriends = 0;
    // 		for (let j = 0; j < people[i].friends.length; j++) {
    // 				for (let k = 0; k < people.length; k++) {
    // 						if (people[i].friends[j] === people[k].guid) {
    // 								if (people[k].gender === "male") {
    // 										people[i].maleFriends += 1;
    // 								}
    // 						}
    // 				}
    // 		}
    // }
    // let popularPersonAmongGuys = "";
    // let maxNumOfMaleFriends = 0;
    // for (let i = 0; i < people.length; i++) {
    // 		if (people[i].maleFriends >= maxNumOfMaleFriends) {
    // 				maxNumOfMaleFriends = people[i].maleFriends;
    // 				popularPersonAmongGuys = people[i].name;
    // 		}
    // }
    // return popularPersonAmongGuys;

    // hash map에 아이디 성별 넣어놓고 찾아다 쓰기
    let maleGUID = new Map();
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        if (person.gender === "male") {
            maleGUID[person.guid] = person.gender;
        }
    }

    let maxNumOfMaleFriends = 0;
    let mostPopularAmongGuys = "";

    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        const friends = person.friends;

        let maleCount = 0;
        for (let j = 0; j < friends.length; j++) {
            const friendGUID = friends[j];

            if (maleGUID[friendGUID]) {
                maleCount++;
            }
        }

        if (maleCount > maxNumOfMaleFriends) {
            maxNumOfMaleFriends = maleCount;
            mostPopularAmongGuys = person.name;
        }
    }

    return mostPopularAmongGuys;
}
