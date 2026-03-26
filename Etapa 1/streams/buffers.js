//São representações de espaços na memória do computador, são dados armazenados, tratados e removidos da memória(Guarda o dado de maneira binária(hexadecimal), não em forma de texto)
// Hexadecimal = 16 bit, armazena valores com 16 símbolos, sendo esses valores 0123456789ABCDF , onde ABCDEF corresponde a 12 13 14 15 16
const buf = Buffer.from("ok")
console.log(buf.toJSON)
//Retorna <Buffer 6f 6b> buffer=classe 6f= letra "o" e 6b= letra"k"
//Ao conveter pra JSON o dado é retornado em forma DECIMAL
