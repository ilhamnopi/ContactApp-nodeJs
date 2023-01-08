const { pertanyaan, simpanContact } = require('./contacts');

const main = async () => {
    const nama = await pertanyaan('Masukan nama anda: ')
    const email = await pertanyaan('Masukan email anda: ')
    const noHp = await pertanyaan('Masukan nohp anda: ')

    simpanContact(nama, email, noHp)
}

main()
