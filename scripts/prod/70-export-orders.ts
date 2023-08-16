import { writeFileSync } from 'fs';

const ORDER_CODE_HASH =
  '08e6968fa8978d48327332fca52e655302bf35714574324671290e3a68cc60a4';
const ORDER_FACTORY_ADDRESS =
  '0:3c8d39684cabbb780ff77710b02923c59ea2be84e211b09c3258eef344d394a4';

async function main() {
  const orderForUpdate = [];
  let continuation = undefined;
  let hasResults = true;
  while (hasResults) {
    const result: any = await locklift.provider.getAccountsByCodeHash({
      codeHash: ORDER_CODE_HASH,
      continuation,
      limit: 100,
    });
    continuation = result.continuation;
    hasResults = result.accounts.length === 100;
    for (const orderAddress of result.accounts) {
      const Order = await locklift.factory.getDeployedContract(
        'Order',
        orderAddress,
      );

      const dataFactory = (
        await Order.methods.getDetails({ answerId: 0 }).call({})
      ).value0;

      if (
        dataFactory.factory.toString() == ORDER_FACTORY_ADDRESS &&
        dataFactory.state.toString() == '2'
      ) {
        orderForUpdate.push({
          order: orderAddress,
        });
      }

      if (result.accounts == 100) {
        continuation = orderAddress;
      }
    }
  }

  console.log(`Count orders: ${orderForUpdate.length}`);
  writeFileSync('./orders.json', JSON.stringify(orderForUpdate, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
