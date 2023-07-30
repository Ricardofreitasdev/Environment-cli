import { program } from "commander";
import addDomain from "./actions/add.js";
import removeDomain from "./actions/remove.js";

program
  .command("add")
  .description("Insere o domínio no arquivo /etc/hosts com o IP do ambiente")
  .action(addDomain);

program
  .command("remove")
  .description("Remove um domínio do arquivo /etc/hosts")
  .action(removeDomain);

program.parse(process.argv);
