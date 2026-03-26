//?search=Ayrton&page=2
//substr tira a interrogação
//split transforma em uma array
//'search=Ayrton', 'page=2'
// [search, Ayrton], [page, 2]

//reduce percorre o array e transforma ele em outra coisa qualquer (oque, vira oque)

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryparams, param) => {
        const [key, value] = param.split('=')

        queryparams[key] = value
        return queryparams
    }, {})
}