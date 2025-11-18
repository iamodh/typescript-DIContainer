import { Injectable } from '../../DIContainer.js';
import { Rank } from '../../types/types.js';
import Lotto from '../domains/Lotto.js';
import WinningLotto from '../domains/WinningLotto.js';

@Injectable()
class LottoChecker {
  calculateStats(lottos: Lotto[], winningLotto: WinningLotto) {
    const stats = new Map<Rank, number>([
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
