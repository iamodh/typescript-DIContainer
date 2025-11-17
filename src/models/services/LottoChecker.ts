class LottoChecker {
  calculateStats(lottos, winningLotto) {
    const stats = new Map([
      ['FIRST', 0],
      ['SECOND', 0],
      ['THIRD', 0],
      ['FOURTH', 0],
      ['FIFTH', 0],
    ]);

    for (const lotto of lottos) {
      const rank = winningLotto.calculateRank(lotto);

      if (rank === 'NONE') {
        continue;
      }
      stats.set(rank, stats.get(rank) + 1);
    }

    return stats;
  }
}

export default LottoChecker;
