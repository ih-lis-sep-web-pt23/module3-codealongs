const bcrypt = require('bcryptjs');
const saltRounds = 20;

const salt = bcrypt.genSaltSync(saltRounds);

console.log('Salt:', salt);

const plainPassword1 = 'HelloIronhacker';
const plainPassword2 = 'HelloWorld';

const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

console.log('Hash1:', hash1);
console.log('Hash2:', hash2);

const verifyPassword1 = bcrypt.compareSync(plainPassword1, hash1);
const verifyPassword2 = bcrypt.compareSync('WrongPassword', hash2);

console.log('Is plainPassword1 corresponding to hash1?', verifyPassword1);
console.log('Is WrongPassword corresponding to hash2?', verifyPassword2);
