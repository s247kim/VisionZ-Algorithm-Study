function indexByGender(input) {
    const answer = { "male": [], "female": [] };
    const males = input.filter(p => p.gender === "male");
    answer["male"] = males;
    const females = input.filter(p => p.gender === "female");
    answer["female"] = females;
    return answer;
}