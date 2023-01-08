const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membuat directory path data
const dirPath = './data';
const dataPath = './data/contacts.json';
if (!fs.existsSync(dirPath) || !fs.existsSync(dataPath)) {
    fs.mkdirSync(dirPath);
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const pertanyaan = (questions) => {
    return new Promise((resolve, reject) => {
        rl.question(questions, (data) => {
            resolve(data)
        })
    })
}

const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file);
    contacts.push(contact)

    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    console.log('thanks to has input data');
    rl.close();
}

module.exports = { pertanyaan, simpanContact }