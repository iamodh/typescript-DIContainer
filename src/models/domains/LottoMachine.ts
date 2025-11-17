import LottoConfig from '../configs/LottoConfig.js';
import Lotto from './Lotto.js';
import NumbersGenerator from './strategies/NumbersGenerator.js';

class LottoMachine {
  #lottoConfig: LottoConfig;
  #numbersGenerator: NumbersGenerator;
  constructor(lottoConfig: LottoConfig, numbersGenerator: NumbersGenerator) {
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
