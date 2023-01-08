const { string } = require("yargs");
const yargs = require("yargs");
const { detailContact, listContacts, simpanContact, deleteContact } = require("./contacts");



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

}).demandCommand()

//menampilkan daftar semua nama kontak
yargs.command({
    command: 'list',
    describe: 'Menambahkan semua nama dan no hp',
    handler() {
        listContacts()
    }
})

// Menampilkan Detail Kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler({ nama }) {
        detailContact(nama)
    }
})


// Menghapus data berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus data sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler({ nama }) {
        deleteContact(nama)
    }
})

yargs.parse()
