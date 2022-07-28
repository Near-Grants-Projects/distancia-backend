
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{HashMap, LazyOption};
use near_sdk::json_types::U128;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, Gas, PanicOnDefault, PromiseOrValue};

pub const TOKEN_CONTRACT: &str = "token.distancia.testnet";
pub const XCC_GAS: Gas = Gas(20000000000000);

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Distancia {
    users: LookUpMap<AccountId, Balance>,

    ads_watched: LookUpMap<AccountId, Vec<String>>,


}

#ext_contract[(ext_token_contract)]
trait TokenTransfer {
    fn get_token_owner();

    fn transfer_tokens(from: AccountId, to: AccountId, amount: Balance, memo: Option<String>);
}

impl Default for Distancia {
    fn default() -> Self {
        env::panic(b"Contract should be initialized before usage")
    }
}

#[near_bindgen]
impl Distancia {

    pub fn ad_watched(&self, amount: U128, ad_key: String) -> Promise {
        let token_contract: AccountId = AccountId::from_str(TOKEN_CONTRACT).unwrap();
        let account_id = env::signer_account_id();

        let token_contract_owner: AccountId = ext_token_contract::ext(&token_contract)
                                    .get_token_owner()
                                    .then(
                                        Self::ext(env::current_account_id())
                                            .with_static_gas(XCC_GAS)
                                            .callback_promise_result()
                                    )

        ext_token_contract::ext(&token_contract)
            .transfer_tokens(token_contract_owner, &account_id, amount)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(XCC_GAS)
                    .callback_promise_result()
            );

        let ads: Vec<String> = ads_watched.get(&account_id);
        ads.push(ad_key.to_string());
        ads_watched.insert(account_id, ads);
    }



    // pub fn set_status(&mut self, message: String) {
    //     let account_id = env::signer_account_id();
    //     self.records.insert(account_id, message);
    // }

    // pub fn get_status(&self, account_id: AccountId) -> Option<String> {
    //     self.records.get(&account_id).cloned()
    // }
}