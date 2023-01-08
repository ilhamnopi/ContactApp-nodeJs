const { string } = require("yargs");
const yargs = require("yargs");
const { simpanContact } = require("./contacts");



yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            describe: 'Nomor handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ nama, email, noHp }) {
        simpanContact(nama, email, noHp)
    }

})

yargs.parse()

// const { pertanyaan, simpanContact } = require('./contacts');

// const main = async () => {
//     const nama = await pertanyaan('Masukan nama anda: ')
//     const email = await pertanyaan('Masukan email anda: ')
//     const noHp = await pertanyaan('Masukan nohp anda: ')

//     simpanContact(nama, email, noHp)
// }

// main()
