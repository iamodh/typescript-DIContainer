import { Console } from '@woowacourse/mission-utils';
import WINNING_CONDITION from '../constants/winningCondition.js';

class OutputView {
  #prizeConfig;

  constructor(prizeConfig) {
    this.#prizeConfig = prizeConfig;
  }

  printPurchasedLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);

    for (const lotto of lottos) {
      Console.print(`[${lotto.getSortedNumbers().join(', ')}]`);
    }
  }

  printWinningStatistic(winningStatistic) {
    Console.print('당첨 통계');
    Console.print('---');

    for (const [rank, count] of winningStatistic.entries()) {
      const money = this.#prizeConfig.getPrize(rank).toLocaleString();

      Console.print(`${WINNING_CONDITION[rank]} (${money}원) - ${count}개`);
    }
  }

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate.toLocaleString()}%입니다.`);
  }

  printError(error) {
    Console.print(error);
  }

  printNewLine() {
    Console.print('');
  }
}

export default OutputView;
