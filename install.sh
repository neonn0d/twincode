#!/usr/bin/env bash
# twincode installer — sets up everything `twin` needs:
#   node 20+ check, bun (downloaded if missing, no sudo needed),
#   npm install, build, and a `twin` command on your PATH.
#
# Usage:  ./install.sh
# Safe to re-run any time (e.g. after `git pull` to rebuild).
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
BIN_DEST="$HOME/.local/bin"
BUN_DIR="$HOME/.bun/bin"

if [ -t 1 ]; then B=$(tput bold) G=$(tput setaf 2) Y=$(tput setaf 3) R=$(tput sgr0); else B="" G="" Y="" R=""; fi
ok()   { printf '%s✓%s %s\n' "$G" "$R" "$*"; }
warn() { printf '%s!%s %s\n' "$Y" "$R" "$*"; }
die()  { printf 'error: %s\n' "$*" >&2; exit 1; }

# ---- node 20+ ---------------------------------------------------------------
command -v node >/dev/null 2>&1 || die "Node.js 20+ is required — install it first (https://nodejs.org)"
node -e 'process.exit(parseInt(process.versions.node) >= 20 ? 0 : 1)' \
    || die "Node.js 20+ required, found $(node --version)"
command -v npm >/dev/null 2>&1 || die "npm not found — install Node.js with npm included"
ok "node $(node --version)"

# ---- bun (needed to build) --------------------------------------------------
find_bun() {
    command -v bun 2>/dev/null && return 0
    [ -x "$BUN_DIR/bun" ] && { echo "$BUN_DIR/bun"; return 0; }
    return 1
}

install_bun() {
    local os arch asset tmp
    os="$(uname -s)" arch="$(uname -m)"
    case "$os/$arch" in
        Linux/x86_64)
            if grep -qm1 avx2 /proc/cpuinfo 2>/dev/null; then
                asset=bun-linux-x64
            else
                asset=bun-linux-x64-baseline   # older CPUs without AVX2
            fi ;;
        Linux/aarch64|Linux/arm64) asset=bun-linux-aarch64 ;;
        Darwin/arm64)              asset=bun-darwin-aarch64 ;;
        Darwin/x86_64)             asset=bun-darwin-x64 ;;
        *) die "unsupported platform: $os/$arch — install bun manually (https://bun.sh)" ;;
    esac

    echo "installing bun ($asset)…"
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    local url="https://github.com/oven-sh/bun/releases/latest/download/$asset.zip"
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL -o "$tmp/bun.zip" "$url"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$tmp/bun.zip" "$url"
    else
        die "need curl or wget to download bun"
    fi

    # extract without assuming unzip exists (python3 fallback)
    if command -v unzip >/dev/null 2>&1; then
        unzip -q "$tmp/bun.zip" -d "$tmp"
    elif command -v python3 >/dev/null 2>&1; then
        python3 -c "import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])" "$tmp/bun.zip" "$tmp"
    else
        die "need unzip or python3 to extract bun"
    fi

    mkdir -p "$BUN_DIR"
    mv "$tmp/$asset/bun" "$BUN_DIR/bun"
    chmod +x "$BUN_DIR/bun"
}

if BUN="$(find_bun)"; then
    ok "bun $("$BUN" --version) (already installed)"
else
    install_bun
    BUN="$BUN_DIR/bun"
    ok "bun $("$BUN" --version) installed to $BUN_DIR"
fi
export PATH="$(dirname "$BUN"):$PATH"

# ---- dependencies + build ---------------------------------------------------
cd "$REPO_DIR"
echo "installing dependencies…"
npm install --no-fund --no-audit --loglevel=error
ok "dependencies installed"

echo "building…"
npm run build >/dev/null
[ -f "$REPO_DIR/dist/cli.mjs" ] || die "build did not produce dist/cli.mjs"
ok "built dist/cli.mjs"

# ---- link `twin` onto PATH --------------------------------------------------
mkdir -p "$BIN_DEST"
chmod +x "$REPO_DIR/bin/twin"
ln -sf "$REPO_DIR/bin/twin" "$BIN_DEST/twin"
ok "linked $BIN_DEST/twin"

add_path_line() { # $1 rc file, $2 dir
    [ -e "$1" ] || return 0
    grep -qs "$2" "$1" && return 0
    printf '\nexport PATH="%s:$PATH"\n' "$2" >> "$1"
}
touch "$HOME/.bashrc"
add_path_line "$HOME/.bashrc" '$HOME/.local/bin'
add_path_line "$HOME/.zshrc" '$HOME/.local/bin'

# ---- smoke test -------------------------------------------------------------
v="$("$REPO_DIR/bin/twin" --version)" || die "twin --version failed"
ok "twin $v works"

echo
case ":$PATH:" in
    *":$BIN_DEST:"*)
        printf '%sDone.%s Run %stwin%s to get started.\n' "$B" "$R" "$B" "$R" ;;
    *)
        printf '%sDone.%s Now run:  %ssource ~/.bashrc%s   (or open a new terminal)\n' "$B" "$R" "$B" "$R"
        printf 'Then run %stwin%s to get started.\n' "$B" "$R" ;;
esac
