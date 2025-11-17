import { Random } from '@woowacourse/mission-utils';
import LottoConfig from '../../configs/LottoConfig.js';

class RandomStrategy {
  #lottoConfig: LottoConfig;
  constructor(lottoConfig: LottoConfig) {
    this.#lottoConfig = lottoConfig;
  }

  generate(): number[] {
    return Random.pickUniqueNumbersInRange(
      this.#lottoConfig.getNumbersFrom(),
      this.#lottoConfig.getNumbersTo(),
      this.#lottoConfig.getNumbersCount()
    );
  }
}

export default RandomStrategy;
