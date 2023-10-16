import {Address, Contract} from "locklift";
import {TokenWalletUpgradeableAbi} from "../../build/factorySource";
import {Account} from 'locklift/everscale-client'
import {logTestProcessing} from "../log.utils";
const {toNano} = locklift.utils;


export class TokenWallet {
    public contract: Contract<TokenWalletUpgradeableAbi>;
    public _owner: Account | Address;
    public address: Address;
    public name: string | undefined;

    constructor(wallet_contract: Contract<TokenWalletUpgradeableAbi>, wallet_owner: Account | Address, name?: string) {
        this.contract = wallet_contract;
        this._owner = wallet_owner;
        this.address = this.contract.address;
        this.name = name ? name : undefined;
    }

    static async from_addr(addr: Address, owner: Account | Address, name?: string) {
        const wallet = locklift.factory.getDeployedContract('TokenWalletUpgradeable', addr);
        return new TokenWallet(wallet, owner, name);
    }

    async owner() {
        return await this.contract.methods.owner({answerId: 0}).call();
    }

    async root() {
        return await this.contract.methods.root({answerId: 0}).call();
    }

    async balance() {
        return (await this.contract.methods.balance({answerId: 0}).call()).value0;
    }

    async transfer(amount: number|string, receiver: Address, payload = '', value: any) {
        let notify = payload !== '';

        logTestProcessing(`${this.name}(${this.address}).transfer()`,
  `amount: ${amount},
          recipient: ${receiver},
          deployWalletValue: ${locklift.utils.toNano(0.4)},
          remainingGasTo: ${this.address},
          notify: ${true},
          payload: ${payload}
          )`)

        return await this.contract.methods.transfer({
            amount: amount,
            recipient: receiver,
            deployWalletValue: toNano(0.4),
            remainingGasTo: !(this._owner instanceof Address) ? this._owner.address : this._owner,
            notify: notify,
            payload: payload
        }).send({
            amount: value || toNano(5),
            from: !(this._owner instanceof Address) ? this._owner.address : this._owner
        });
    }
}