

export function filtrar(query) {
    return query.substr(1).split('&').reduce((parametrosdefiltro, parametros) => {
        const [chave, valor] = parametros.split('=')
        parametrosdefiltro[chave] = valor

        return parametrosdefiltro
    }, {})}