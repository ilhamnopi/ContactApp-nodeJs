const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

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

const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file);

    // Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if (duplikat) {
        console.log(chalk.red.inverse.bold("Contact sudah terdaftar gunakan nama lain"));
        rl.close()
        return false
    }

    // Cek email
    const trueEmail = validator.isEmail(email);
    if (email && !trueEmail) {
        console.log(chalk.red.inverse.bold("email tidak valid !"));
        rl.close()
        return false
    }

    // Cek nohp
    const trueNoHp = validator.isMobilePhone(noHp, 'id-ID')
    if (!trueNoHp) {
        console.log(chalk.red.inverse.bold("Nomor handphone tidak valid !"));
        rl.close()
        return false
    }

    contacts.push(contact)

    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    console.log(chalk.green.inverse.bold('thanks to has input data'));
    rl.close()

}

module.exports = { simpanContact }