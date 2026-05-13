# Instruções

## Estrutura, regras e requisitos do projeto

Esse projeto consiste no desenvolvimento de uma API REST chamada FindAFriend para um sistema de adoção de animais. O projeto deve ser construído reforçando os conceitos de SOLID e a prática de testes automatizados.

A API deve seguir um conjunto de funcionalidades e regras de negócio.

## Funcionalidades da Aplicação

[ ] O cadastro de um pet, associado a uma org

[ ] O cadastro de uma ORG, com endereço e numero do zap

[ ] A listagem de todos os pets disponíveis para adoção em uma determinada cidade (parâmetro)

[ ] A filtragem opcional de pets com base em suas características (como idade, porte, etc.)

[ ] A visualização dos detalhes de um pet específico

[ ] O acesso de administrador da ORG é restrito a usuários logados

[ ] Aplicar princípios SOLID na estruturação da API (use cases e os caramba)

[ ] Testes para validar as funcionalidades e regras de negócios

## Regras de Negócio

### As seguintes condições devem ser implementadas:

[ ] A informação da cidade é obrigatória para listar os pets

[ ] Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp

[ ] Todo pet cadastrado precisa estar vinculado a uma ORG

[ ] O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp

[ ] Todos os filtros de características do pet, com exceção da cidade, são opcionais

[ ] Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada