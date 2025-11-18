import { Injectable } from '../../../DIContainer.js';
import { Rank } from '../../../types/types.js';

interface IPrizeConfig {
  FIRST: number;
  SECOND: number;
  THIRD: number;
  FOURTH: number;
  FIFTH: number;
}

@Injectable()
class PrizeConfig {
  #config: IPrizeConfig;

  constructor(
    FIRST = 2000000000,
    SECOND = 30000000,
    THIRD = 1500000,
    FOURTH = 50000,
    FIFTH = 5000
  ) {
    this.#config = {
      FIRST,
      SECOND,
      THIRD,
      FOURTH,
      FIFTH,
    };

    Object.freeze(this.#config);
  }

  getPrize(rank: Rank) {
    return this.#config[rank];
  }
}

export default PrizeConfig;
