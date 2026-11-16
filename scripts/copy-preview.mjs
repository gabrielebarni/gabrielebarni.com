#!/usr/bin/env node
// Copy a committed preview/ tree into the production output after Pagefind
// has indexed the live site, so /preview/ is published but not searched from /.
import { cpSync, existsSync, rmSync } from "node:fs";
if (!existsSync("preview")) process.exit(0);
rmSync("_site/preview", { recursive: true, force: true });
cpSync("preview", "_site/preview", { recursive: true });
console.log("copied preview/ → _site/preview/");
