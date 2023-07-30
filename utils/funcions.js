import { fileURLToPath } from "url";
import path from "node:path";
import fs from "node:fs";

export function getIpAddressForEnvironment(environment) {
  const __filename = fileURLToPath(new URL(import.meta.url));
  const configFile = path.join(path.dirname(__filename), "../config.json");

  const configData = fs.readFileSync(configFile, "utf8");

  try {
    const config = JSON.parse(configData);

    if (environment in config.environments) {
      return config.environments[environment];
    } else {
      return null;
    }
  } catch (err) {
    console.error("Erro ao ler o arquivo de configuração:", err);
    return null;
  }
}

export function extractDomains(data) {
  const regex = /(\S+)\s+/g;
  const matches = [];
  let match;
  while ((match = regex.exec(data))) {
    if (!isIpAddress(match[1])) {
      matches.push(match[1]);
    }
  }
  return matches;
}

export function isValidDomain(domain) {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

function isIpAddress(input) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Pattern.test(input);
}
