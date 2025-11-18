import { Injectable } from '../../DIContainer.js';
import LottoConfig from './configs/LottoConfig.js';
import Lotto from '../domains/Lotto.js';
import RandomStrategy from './strategies/RandomStrategy.js';

@Injectable()
class LottoMachine {
  #lottoConfig: LottoConfig;
  #numbersGenerator: RandomStrategy;
  constructor(lottoConfig: LottoConfig, numbersGenerator: RandomStrategy) {
    this.#lottoConfig = lottoConfig;
    this.#numbersGenerator = numbersGenerator;
  }

  execute(money: number) {
    const lottos: Lotto[] = [];
    const quantity = money / this.#lottoConfig.getPrice();
    for (let i = 0; i < quantity; i++) {
      const numbers = this.#numbersGenerator.generate();

      lottos.push(new Lotto(this.#lottoConfig, numbers));
    }

    return lottos;
  }
}

export default LottoMachine;
