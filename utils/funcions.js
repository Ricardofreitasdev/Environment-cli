import { fileURLToPath } from "url";
import path from "node:path";
import fs from "node:fs";
import dns from "node:dns";

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
    const potentialDomain = match[1];

    if (!isIpAddress(potentialDomain) && potentialDomain.includes(".")) {
      matches.push(potentialDomain);
    }
  }
  return matches;
}

export function isValidDomain(domain) {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

export async function resolveDns(domain) {
  try {
    const { address } = await dns.promises.lookup(domain);
    return address;
  } catch (error) {
    throw new Error(`Erro ao resolver DNS para ${domain}: ${error.message}`);
  }
}

function isIpAddress(input) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Pattern.test(input);
}
