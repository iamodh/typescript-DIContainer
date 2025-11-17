import { Console } from '@woowacourse/mission-utils';
import WINNING_CONDITION from '../constants/winningCondition.js';
import PrizeConfig from '../models/configs/PrizeConfig.js';
import Lotto from '../models/domains/Lotto.js';
import { WinningStatistic } from '../types/types.js';

class OutputView {
  #prizeConfig: PrizeConfig;

  constructor(prizeConfig: PrizeConfig) {
    this.#prizeConfig = prizeConfig;
  }

  printPurchasedLottos(lottos: Lotto[]) {
    Console.print(`${lottos.length}개를 구매했습니다.`);

    for (const lotto of lottos) {
      Console.print(`[${lotto.getSortedNumbers().join(', ')}]`);
    }
  }

  printWinningStatistic(winningStatistic: WinningStatistic) {
    Console.print('당첨 통계');
    Console.print('---');

    for (const [rank, count] of winningStatistic.entries()) {
      const money = this.#prizeConfig.getPrize(rank).toLocaleString();

      Console.print(`${WINNING_CONDITION[rank]} (${money}원) - ${count}개`);
    }
  }

  printProfitRate(profitRate: number) {
    Console.print(`총 수익률은 ${profitRate.toLocaleString()}%입니다.`);
  }

  printError(error: unknown) {
    Console.print(error);
  }

  printNewLine() {
    Console.print('');
  }
}

export default OutputView;
