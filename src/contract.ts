import { BigInt } from "@graphprotocol/graph-ts"
import { Contract, PairCreated } from "../generated/Contract/Contract"
import { Factory } from "../generated/schema"

export function handlePairCreated(event: PairCreated): void {

  // TODO auto-geenerated
  let entity = Factory.load(event.transaction.from.toHex())

  if (!entity) {
    entity = new Factory(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1

  /** TODO : 
   *  1. Store lp-token address
   *  2. Store feeTo and feeToSetter
   *  3. Using Pair template, start indexing newly created Liquidity Pair
   */
  
  // Entities can be written to the store with `.save()`
  entity.save()
}
