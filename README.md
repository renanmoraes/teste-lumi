# Teste Lumi

## Author
Sou Renan, tenho 31 anos e amo desenvolver, tenho bastante experiencias com desenvolvimento de software em varias areas de atuacao, meu hobby favorito e passar tempo com minha esposa (estamos esperando um filho Isaac).

Amo aprender e compartilhar faz parte de minha vida.

Apesar de ser fullstack me dou muito melhor trabalhando com backend, porem tenho experiencias em desenvolvimento web e mobile tambem.

Um das minhas maiores vitorias foi ter que aprender e fazer um site para ranqueamento no google, tive que estudar bastante regras de SEO e colocar em pratica em uma startup de mobilidade urbana, onde disponibilizavamos nossos horarios para usuario que pesquisassem no google `horario de onibus ana rita` e tivemos muito exito por tempo.

No desenvolvimento desse projeto tentei dar meu melhor, tive que aprender a trabalhar com o plugin `pdf-parse` ele e bastante versatil para leituras de PDF em geral.

## Introduction
Para o desenvolvimento backend foi utilizado um framework express chamado NestJS na versao `10.3.2`.
A versao do node e versao `18.18.2` que e uma versao estavel.

### Start project
Para iniciar o projeto voce anteriormente deve configuar as variaveis de ambiente, para auxiliar eu deixei um arquivo padrao chamado `.env-example` onde nele podera ver as variaveis requisitadas para o sistemas funcionar.

Para copiar basta executar (na pasta server):

```sh
 cp .env-example .env
```

Isso ira gerar um arquivo .env na raiz do projeto onde sera necessario alterar os valores das variaveis para adequar ao ambiente onde voce esta rodando.

## Database
Para facilitar estarei disponibilizando um arquivo para iniciar um docker com a imagem mais recente do Postgres,
para executar bastas executar o comando `docker-compose up -d` dentro da pasta raiz desse projeto.

Os valores padroes de conexao esta nesse arquivo caso precise alterar por algum motivo.
