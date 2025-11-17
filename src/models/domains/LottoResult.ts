import { WinningStatistic } from '../../types/types.js';
import PrizeConfig from '../configs/PrizeConfig.js';

class LottoResult {
  #prizeConfig: PrizeConfig;
  #purchaseMoney: number;
  #winningStatistic: WinningStatistic;

  constructor(
    prizeConfig: PrizeConfig,
    purchaseMoney: number,
    winningStatistic: WinningStatistic
  ) {
    this.#prizeConfig = prizeConfig;
    this.#purchaseMoney = purchaseMoney;
    this.#winningStatistic = winningStatistic;
  }

  calculateProfitRate() {
    const totalPrize = this.#calculateTotalPrize();

    return Math.round((totalPrize / this.#purchaseMoney) * 100 * 10) / 10;
  }

  #calculateTotalPrize() {
    let totalPrize = 0;
    for (const [rank, count] of this.#winningStatistic.entries()) {
      totalPrize += (this.#prizeConfig.getPrize(rank) || 0) * count;
    }

    return totalPrize;
  }
}

export default LottoResult;
