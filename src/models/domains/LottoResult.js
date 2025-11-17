class LottoResult {
  #prizeConfig;
  #purchaseMoney;
  #stats;

  constructor(prizeConfig, purchaseMoney, stats) {
    this.#prizeConfig = prizeConfig;
    this.#purchaseMoney = purchaseMoney;
    this.#stats = stats;
  }

  calculateProfitRate() {
    const totalPrize = this.#calculateTotalPrize();

    return Math.round((totalPrize / this.#purchaseMoney) * 100 * 10) / 10;
  }

  #calculateTotalPrize() {
    let totalPrize = 0;
    for (const [rank, count] of this.#stats.entries()) {
      totalPrize += (this.#prizeConfig.getPrize(rank) || 0) * count;
    }

    return totalPrize;
  }
}

export default LottoResult;
