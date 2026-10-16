import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const readFixture = (name: string): string =>
  readFileSync(fileURLToPath(new URL(`./__fixtures__/${name}`, import.meta.url)), "utf-8")
    .replace(/>\s+</g, "><")
    .trim();
