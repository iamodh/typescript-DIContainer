import { Injectable } from '../../../DIContainer.js';

interface LottoConfigOptions {
  readonly PRICE: number;
  readonly NUMBER_RANGE_FROM: number;
  readonly NUMBER_RANGE_TO: number;
  readonly NUMBERS_COUNT: number;
}

const DEFAULT_LOTTO_CONFIG: LottoConfigOptions = {
  PRICE: 1000,
  NUMBER_RANGE_FROM: 1,
  NUMBER_RANGE_TO: 45,
  NUMBERS_COUNT: 6,
};

@Injectable()
class LottoConfig {
  readonly #config: LottoConfigOptions;

  constructor() {
    this.#config = {
      ...DEFAULT_LOTTO_CONFIG,
    };

    Object.freeze(this.#config);
  }

  getPrice() {
    return this.#config.PRICE;
  }

  getNumbersFrom() {
    return this.#config.NUMBER_RANGE_FROM;
  }

  getNumbersTo() {
    return this.#config.NUMBER_RANGE_TO;
  }

  getNumbersCount() {
    return this.#config.NUMBERS_COUNT;
  }
}

export default LottoConfig;
