
npx locklift run --config ./locklift.config.ts --disable-build --network main --script scripts/prod/40-export-order-roots.ts
npx locklift run --config ./locklift.config.ts --disable-build --network main --script scripts/prod/70-export-orders.ts
npx locklift run --config ./locklift.config.ts --disable-build --network main --script scripts/30-update-order-code-in-factory.ts
npx locklift run --config ./locklift.config.ts --disable-build --network main --script scripts/60-update-order-code-in-order-roots.ts
npx locklift run --config ./locklift.config.ts --disable-build --network main --script scripts/80-update-orders.ts
