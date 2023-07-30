import fs from "node:fs";
import inquirer from "inquirer";
import {
  getIpAddressForEnvironment,
  isValidDomain,
} from "../utils/funcions.js";

async function addDomain() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "domain",
        message: "Insira o domínio que deseja adicionar:",
        validate: (input) => {
          const trimmedInput = input.trim();
          if (isValidDomain(trimmedInput)) {
            return true;
          }
          return "Por favor, insira um domínio válido.";
        },
      },
      {
        type: "list",
        name: "environment",
        message: "Selecione o ambiente:",
        choices: ["development", "staging", "production"],
      },
    ]);

    const { domain, environment } = answers;
    const ip = getIpAddressForEnvironment(environment);

    if (!ip) {
      console.error("Ambiente inválido.");
      return;
    }

    const entry = `\n${ip} ${domain}\n`;

    fs.appendFile("/etc/hosts", entry, (err) => {
      if (err) {
        console.error("Erro ao inserir o domínio no arquivo /etc/hosts:", err);
        return;
      }

      console.log(
        `${domain} foi adicionado com sucesso em /etc/hosts apontando para ${environment} (${ip}).`
      );
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

export default addDomain;
