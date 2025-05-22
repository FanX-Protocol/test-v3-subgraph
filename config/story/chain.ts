import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0xb8c21e89983B5EcCD841846eA294c4c8a89718f1'

export const REFERENCE_TOKEN = '0x1514000000000000000000000000000000000000' // WSTORY 주소
export const STABLE_TOKEN_POOL = '0x4a170a20dd1ff838c99d49ac18b517a339206e83' // WSTORY-USDC 페어 주소 piperX

// token where amounts should contribute to tracked volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x1514000000000000000000000000000000000000', // WSTORY
  '0xf1815bd50389c46847f0bda824ec8da914045d14', // USDC.e
  // 필요시 다른 주요 토큰 추가
]

export const STABLE_COINS = [
  '0xf1815bd50389c46847f0bda824ec8da914045d14', // USDC.e
  // 필요시 다른 스테이블코인 추가
]

export const TVL_MULTIPLIER_THRESHOLD = '2'
export const MATURE_MARKET = '1000000'
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('20')

export const ROLL_DELETE_HOUR = 768
export const ROLL_DELETE_MINUTE = 1680

export const ROLL_DELETE_HOUR_LIMITER = BigInt.fromI32(500)
export const ROLL_DELETE_MINUTE_LIMITER = BigInt.fromI32(1000)

export const SKIP_POOLS: string[] = []

export const POOL_MAPINGS: Array<Address[]> = []

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = []
