function isNumeric(cpf) {
    return /^\d+$/.test(cpf);
}

module.exports = isNumeric;