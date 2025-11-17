class PrizeConfig {
  #config;

  constructor(
    first = 2000000000,
    second = 30000000,
    third = 1500000,
    fourth = 50000,
    fifth = 5000
  ) {
    this.#config = {
      FIRST: first,
      SECOND: second,
      THIRD: third,
      FOURTH: fourth,
      FIFTH: fifth,
    };

    Object.freeze(this.#config);
  }

  getPrize(rank) {
    return this.#config[rank];
  }
}

export default PrizeConfig;
