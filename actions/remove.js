import fs from "node:fs";
import inquirer from "inquirer";
import { extractDomains } from "../utils/funcions.js";

async function removeDomain() {
  try {
    const data = await fs.promises.readFile("/etc/hosts", "utf8");
    const domains = extractDomains(data);

    if (domains.length === 0) {
      console.log("Nenhum domínio encontrado em /etc/hosts.");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "domainToRemove",
        message: "Selecione o domínio que deseja remover:",
        choices: domains,
      },
    ]);

    const { domainToRemove } = answers;
    const regex = new RegExp(`\\n.*${domainToRemove}\\n`);
    const updatedData = data.replace(regex, "\n");

    await fs.promises.writeFile("/etc/hosts", updatedData, "utf8");

    console.log(`${domainToRemove} foi removido com sucesso de /etc/hosts.`);
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

export default removeDomain;
