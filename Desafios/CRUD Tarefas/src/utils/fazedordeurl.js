//regex é um filtro de busca para encontrar linhas padronizadas

export function fazedordeurl(url) {
    const regexdeurl = /:([a-zA-Z]+)/g
    const urlcomparametro = url.replaceAll(regexdeurl, '(?<$1>[a-z0-9\-_]+)')
    
    //regex é criada entre barras
    //tudo que ta dentro das barras é procurado
    //nesse caso, o padrão buscado é ":" seguido de letras de A-Z minusculas e maiusuculas
    //o "+" define que essas letras podem se repetir 1 ou mais vezes
    //o "g" após a barra torna essa regex global, fazendo ela continuar filtrando após a /
    //exemplo: não-global -> tarefas/:azaza/grupos/:zaza [para no ":azaza"]
    //         global     -> tarefas/:azaza/grupos/:zaza [nota o ":azaza" e o ":zaza"] 

    const urlregex = new RegExp(`^${urlcomparametro}(?<query>\\?(.*))?$`) //o "^" é lido como "string começa com ->"
    return urlregex
}