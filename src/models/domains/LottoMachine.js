import Lotto from './Lotto.js';

class LottoMachine {
  #lottoConfig;
  #numbersGenerator;
  constructor(lottoConfig, numbersGenerator) {
    this.#lottoConfig = lottoConfig;
    this.#numbersGenerator = numbersGenerator;
  }

  execute(money) {
    const lottos = [];
    const quantity = money / this.#lottoConfig.getPrice();
    for (let i = 0; i < quantity; i++) {
      const numbers = this.#numbersGenerator.generate();

      lottos.push(new Lotto(this.#lottoConfig, numbers));
    }

    return lottos;
  }
}

export default LottoMachine;
