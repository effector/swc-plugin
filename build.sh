#!/bin/bash

set -euo pipefail

package_version=$(jq -r '.version' "package.json")

mkdir -p target/bundles

echo "========="

if [ "${TEST:-0}" = "1" ]; then
  echo "Testing the base plugin..."
  cargo test
fi;

if [ "${BUILD:-1}" = "1" ]; then
  echo "Finalizing the base plugin..."
  cargo build-plugin --release
  cp target/wasm32-wasip1/release/effector_swc_plugin.wasm .

  echo "Packing $package_version..."
  pnpm pack
  mv "effector-swc-plugin-$package_version.tgz" "target/bundles/"
fi;

echo "========="

export CARGO_TARGET_DIR="../target"

temp_dir=./build/
features=ecma_plugin_transform,ecma_quote,ecma_utils,ecma_parser
versions=$(jq -r 'map("\(.rust):\(.node.lo):\(.node.hi):\(.features)") | .[]' versions.json)

for pair in $versions; do
  IFS=':' read -r rust_swc npm_swc node_hi build_features <<< "$pair"
  
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

  echo "Loading packages ($rust_swc)..."
  cargo add swc_core@$rust_swc --features "$features" --quiet

  echo "Features for $rust_swc: ${build_features:-"none!"}"

  if [ "${TEST:-0}" = "1" ]; then
    echo "Testing the build $publish_version..."
    cargo test --features packing --features "$build_features" --quiet
  fi;

  if [ "${BUILD:-1}" = "1" ]; then
    echo "Finalizing the build $publish_version..."
    cargo build-plugin --release --features "$build_features" --quiet

    cp ../target/wasm32-wasip1/release/effector_swc_plugin.wasm .

    echo "Packing $publish_version..."
    
    pnpm pack
    mv "effector-swc-plugin-$publish_version.tgz" "../target/bundles/"
  fi;

  popd
  rm -rf "$temp_dir"
done

echo 
echo "All packages ready."
echo 
