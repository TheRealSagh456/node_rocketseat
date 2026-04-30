# Conceito

Aplicativo de auxílio na manutenção de uma dieta, o usuário envia os dados de suas refeicoes e observa seu progresso


# Regras

[x] Deve ser possível criar um usuário (cookie)

[x] Deve ser possível identificar o usuário entre as requisições (cookie)

[x] Deve ser possível registrar uma refeição feita, com as seguintes infos:
    -> Nome
    -> Descrição
    -> Data e Hora
    -> Está dentro ou não da dieta

[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima (PATCH)

[x] Deve ser possível apagar uma refeição (DELETE)

[x] Deve ser possível listar todas as refeicoes de um usuário (GET específico)

[x] Deve ser possível visualizar uma única refeição (via nome)

[ ] Deve ser possível recuperar as métricas de um usuário (sum())
    -> Total de refeicoes
    -> Total de refeicoes dentro da dieta
    -> Total de refeicoes fora da dieta
    -> Melhor sequência de refeicoes dentro da dieta (seloko, pegar sequência de "dentro da dieta")

 
