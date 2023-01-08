const chalk = require('chalk');
const { log } = require('console');
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

const loadContect = () => {
    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file);
    return contacts
}

const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    // const file = fs.readFileSync(dataPath, 'utf-8')
    // const contacts = JSON.parse(file);
    const contacts = loadContect()


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

const listContacts = () => {
    const contacts = loadContect()
    console.log(chalk.cyanBright.inverse.bold('Daftar Kontak'))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`)
    })
    rl.close()
}

const detailContact = (nama) => {
    const contacts = loadContect();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan !`));
        rl.close()
        return false
    }

    console.log(chalk.green.inverse("data ditemukan"));
    console.log(chalk.green(`
    \n nama: ${contact.nama}
    \n email: ${contact.email}
    \n email: ${contact.noHp}
    `))
    rl.close()

}

const deleteContact = (nama) => {
    const contacts = loadContect();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse(`Nama ${nama} tidak ada !`));
        rl.close()
        return false
    }

    fs.writeFileSync(dataPath, JSON.stringify(newContacts, null, 2));
    console.log(chalk.green.inverse.bold(`data ${nama} berhasil dihapus`));
    rl.close()
}

module.exports = { deleteContact, detailContact, listContacts, simpanContact }