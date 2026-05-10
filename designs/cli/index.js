#!/usr/bin/env node

const { select, checkbox } = require("@inquirer/prompts");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const MANIFEST = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "manifest.json"), "utf-8")
);
const BRANDS_DIR = path.join(__dirname, "..", "brands");

function score(brand, { theme, vibes, shape }) {
  if (brand.theme !== theme) return -1;
  let s = 0;
  const overlap = (vibes || []).filter((v) => (brand.vibe || []).includes(v)).length;
  s += overlap * 5;
  if (shape !== "any" && brand.shape === shape) s += 4;
  if (brand.has_shadows === false && theme === "dark") s += 1;
  return s;
}

function extractCss(content, heading) {
  const re = new RegExp(`### ${heading}[\\s\\S]*?\`\`\`css([\\s\\S]*?)\`\`\``, "i");
  const m = content.match(re);
  return m ? m[1].trim() : null;
}

function extractAgentGuide(content) {
  const m = content.match(/## Agent Prompt Guide([\s\S]*?)(?=\n## |$)/);
  return m ? m[1].trim() : null;
}

function copyToClipboard(text) {
  const cmds = [
    ["xclip", ["-selection", "clipboard"]],
    ["xsel", ["--clipboard", "--input"]],
    ["wl-copy", []],
  ];
  for (const [cmd, args] of cmds) {
    try {
      execSync([cmd, ...args].join(" "), { input: text, stdio: ["pipe", "ignore", "ignore"] });
      return true;
    } catch {}
  }
  return false;
}

function dim(s) { return `\x1b[2m${s}\x1b[0m`; }
function bold(s) { return `\x1b[1m${s}\x1b[0m`; }
function green(s) { return `\x1b[32m${s}\x1b[0m`; }
function cyan(s) { return `\x1b[36m${s}\x1b[0m`; }

async function main() {
  console.log(`\n  ${bold("twin-designer")} ${dim("— find your brand style")}\n`);

  const theme = await select({
    message: "Theme?",
    choices: [
      { name: "Light", value: "light" },
      { name: "Dark",  value: "dark"  },
    ],
  });

  const vibes = await checkbox({
    message: "Vibe? (space to select, 1-3 max)",
    choices: [
      { name: "Minimal",    value: "minimal"    },
      { name: "Clean",      value: "clean"      },
      { name: "Bold",       value: "bold"       },
      { name: "Technical",  value: "technical"  },
      { name: "Playful",    value: "playful"    },
      { name: "Luxury",     value: "luxury"     },
      { name: "Editorial",  value: "editorial"  },
      { name: "Futuristic", value: "futuristic" },
      { name: "Energetic",  value: "energetic"  },
      { name: "Brutalist",  value: "brutalist"  },
    ],
    validate: (v) => v.length > 0 || "Pick at least one",
  });

  const shape = await select({
    message: "Shape language?",
    choices: [
      { name: "Rounded",       value: "rounded" },
      { name: "Sharp / Square", value: "sharp"   },
      { name: "Pill",           value: "pill"    },
      { name: "Don't care",     value: "any"     },
    ],
  });

  const ranked = MANIFEST
    .map((b) => ({ ...b, _score: score(b, { theme, vibes, shape }) }))
    .filter((b) => b._score >= 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 6);

  if (!ranked.length) {
    console.log("\n  No matches. Try different options.\n");
    process.exit(0);
  }

  console.log();

  const chosen = await select({
    message: "Best matches — pick one:",
    choices: ranked.map((b) => ({
      name: `${b.brand.padEnd(28)} ${dim((b.vibe || []).slice(0, 3).join(" · "))}`,
      value: b,
    })),
  });

  const content = fs.readFileSync(path.join(BRANDS_DIR, chosen.file), "utf-8");
  const cssVars  = extractCss(content, "CSS Custom Properties");
  const tailwind = extractCss(content, "Tailwind v4");
  const guide    = extractAgentGuide(content);

  const taglineMatch = content.match(/^>\s*(.+)/m);
  const tagline = taglineMatch ? taglineMatch[1] : "";

  const output = [
    `/* ━━ ${chosen.brand} ━━ */`,
    `/* ${tagline} */`,
    "",
    cssVars  ? `/* CSS Custom Properties */\n:root {\n${cssVars}\n}` : "",
    "",
    tailwind ? `/* Tailwind v4 */\n@theme {\n${tailwind}\n}` : "",
    "",
    guide    ? `/* ── Agent Prompt Guide ──\n${guide}\n*/` : "",
  ].filter(Boolean).join("\n");

  const copied = copyToClipboard(output);

  console.log();
  console.log(`  ${green("✓")} ${bold(chosen.brand)}`);
  console.log(`  ${dim(tagline)}`);
  console.log();
  console.log(`  ${dim("fonts  ")} ${(chosen.fonts || []).join(", ")}`);
  console.log(`  ${dim("colors ")} ${chosen.color_count} tokens${chosen.has_gradients ? " + gradients" : ""}`);
  console.log(`  ${dim("shape  ")} ${chosen.shape}${chosen.has_shadows ? " · shadows" : " · flat"}`);
  console.log(`  ${dim("vibe   ")} ${(chosen.vibe || []).join(", ")}`);
  console.log();

  if (copied) {
    console.log(`  ${cyan("⬆ Copied to clipboard")} — paste into your project or AI tool`);
  } else {
    console.log(`  ${cyan("── Output ──")}\n`);
    console.log(output);
  }

  console.log();
}

main().catch((e) => {
  if (e.name !== "ExitPromptError") console.error(e);
  process.exit(0);
});
