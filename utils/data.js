const users = [
    'QuantumLion34',
    'SapphireRunner52',
    'VelvetDragon68',
    'GalaxyNomad00'
];

const userThoughts = [
    'I love fall weather!',
    'New Years is my favorite holiday.',
    'What should my NYE resolution be?',
    'My favorite food is lasagna.'
];

const getRandomArrItem = (arr) => Math.floor(Math.random() * arr.length);

const getRandomUser = () => `${getRandomArrItem(users)}`;

const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            userName: getRandomUser(),
            thought: getRandomThought(userThoughts)
        });
    }

    return results;
};

module.exports = {
    getRandomArrItem,
    getRandomThought,
    getRandomUser,
}; 

