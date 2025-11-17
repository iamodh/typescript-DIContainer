import { Random } from '@woowacourse/mission-utils';

class RandomStrategy {
  #lottoConfig;
  constructor(lottoConfig) {
    this.#lottoConfig = lottoConfig;
  }

  generate() {
    return Random.pickUniqueNumbersInRange(
      this.#lottoConfig.getNumbersFrom(),
      this.#lottoConfig.getNumbersTo(),
      this.#lottoConfig.getNumbersCount()
    );
  }
}

export default RandomStrategy;
