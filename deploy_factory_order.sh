export DEFAULT_PARAMS="--config ./locklift.config.ts --disable-build --enable-tracing --external-build node_modules/tip3/build --network main"
export NO_TRACE="--config ./locklift.config.ts --disable-build --network local"
export NO_TRACE_MAIN="--config ./locklift.config.ts --disable-build --network main"

npx locklift run $NO_TRACE_MAIN --script scripts/0-reset-migration.ts
npx locklift run $NO_TRACE_MAIN --script scripts/1-deploy-account.ts --key_number='0' --balance='5'
npx locklift run $NO_TRACE_MAIN --script scripts/prod/10-deploy-factory-order.ts
