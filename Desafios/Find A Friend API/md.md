# Instruções

## Estrutura, regras e requisitos do projeto

Esse projeto consiste no desenvolvimento de uma API REST chamada FindAFriend para um sistema de adoção de animais. O projeto deve ser construído reforçando os conceitos de SOLID e a prática de testes automatizados.

A API deve seguir um conjunto de funcionalidades e regras de negócio.

## Funcionalidades da Aplicação

[X] O cadastro de um pet, associado a uma org

[X] O cadastro de uma ORG, com endereço e numero do zap

[X] A listagem de todos os pets disponíveis para adoção em uma determinada cidade (parâmetro)

[X] A filtragem opcional de pets com base em suas características (como idade, porte, etc.)

[X] A visualização dos detalhes de um pet específico

[X] O acesso de administrador da ORG é restrito a usuários logados

[X] Aplicar princípios SOLID na estruturação da API (use cases e os caramba)

[-] Testes para validar as funcionalidades e regras de negócios // Vou passar esse por falta de tempo

## Regras de Negócio

### As seguintes condições devem ser implementadas:

[X] A informação da cidade é obrigatória para listar os pets

[X] Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp

[X] Todo pet cadastrado precisa estar vinculado a uma ORG

[X] O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp

[X] Todos os filtros de características do pet, com exceção da cidade, são opcionais

[X] Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada

## Infos PETS

- Org pertencente
- Nome
- Sobre
- Energia
- Tipo de ambiente preferível
- Nível de dependência
- Porte
- Cidade
- Requisitos pra adoção

# PARA O SAMUEL DO FUTURO

    O projeto não ta completamente finalizado, falta evitar comportamentos inesperados, implementar erros específicos e criar tanto os testes unitários quanto os e2e.
    Se você querer levar ele pra frente com React e os escambal, lembra de melhorar o back-end antes.