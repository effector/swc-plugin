#!/bin/bash

set -euo pipefail

package_version=$(jq -r '.version' "package.json")

mkdir -p target/bundles

echo "========="

if [ "${TEST:-0}" = "1" ]; then
  echo "Testing the base plugin..."
  cargo test
fi;

echo "Finalizing the base plugin..."
cargo build-plugin --release
cp target/wasm32-wasi/release/effector_swc_plugin.wasm .

echo "Packing $package_version..."
pnpm pack
mv "effector-swc-plugin-$package_version.tgz" "target/bundles/"

echo "========="

export CARGO_TARGET_DIR="../target"

temp_dir=./build/
features=ecma_plugin_transform,ecma_quote,ecma_utils
versions=$(jq -r 'map("\(.rust):\(.parser):\(.node.lo):\(.node.hi)") | .[]' versions.json)

for pair in $versions; do
  IFS=':' read -r rust_swc parser_swc npm_swc node_hi <<< "$pair"
  
  publish_version="$package_version-swc$npm_swc"
  if [ "$node_hi" = "null" ]; then swc_range=">=$npm_swc"; else swc_range=">=$npm_swc <$node_hi"; fi

  echo "Started building $publish_version for range '$swc_range'"

  mkdir -p $temp_dir
  
  cp Cargo.toml "$temp_dir"
  cp README.md "$temp_dir"
  cat Build.toml >> "$temp_dir/Cargo.toml"

  jq --arg VERSION "$publish_version" \
    --arg RANGE "$swc_range" \
    '.version = $VERSION | .peerDependencies."@swc/core" = $RANGE' package.json > "$temp_dir/package.json"

  pushd "$temp_dir"

  echo "Loading packages..."
  cargo add swc_core@~$rust_swc --features "$features" --quiet
  cargo add swc_ecma_parser@~$parser_swc --quiet

  if [ "${TEST:-0}" = "1" ]; then
    echo "Testing the build..."
    cargo test -F packing --quiet
  fi;

  echo "Finalizing the build..."
  cargo build-plugin --release --quiet

  cp ../target/wasm32-wasi/release/effector_swc_plugin.wasm .

  echo "Packing $publish_version..."
  
  pnpm pack
  mv "effector-swc-plugin-$publish_version.tgz" "../target/bundles/"

  popd
  rm -rf "$temp_dir"
done

echo 
echo "All packages built"
echo 
