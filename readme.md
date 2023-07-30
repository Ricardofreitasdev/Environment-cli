
# Environment-cli

Um CLI (Command Line Interface) simples para adicionar e remover domínios do arquivo /etc/hosts.

## Instalação

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Em seguida, clone este repositório e instale as dependências:

```bash
git clone https://github.com/Ricardofreitasdev/Environment-cli.git

cd Environment-cli

yarn install
```

## Uso

Para executar o CLI, use os comandos a seguir:

```bash
# Para adicionar um domínio ao arquivo /etc/hosts
sudo node index add

# Para remover um domínio do arquivo /etc/hosts
sudo node index remove
```

Siga as instruções fornecidas pelo CLI para adicionar ou remover domínios.

## Requisitos

- Node.js versão 12 ou superior.

## Dependências

- [Commander](https://www.npmjs.com/package/commander) - Biblioteca para criar interfaces de linha de comando.
- [Inquirer](https://www.npmjs.com/package/inquirer) - Biblioteca para interagir com o usuário através de perguntas no console.
