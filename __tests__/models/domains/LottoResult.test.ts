import PrizeConfig from '../../../src/models/services/configs/PrizeConfig.js';
import LottoResult from '../../../src/models/domains/LottoResult.js';
import { WinningStatistic } from '../../../src/types/types.js';

describe('LottoResult 클래스 테스트', () => {
  let defaultPrizeConfig;

  beforeEach(() => {
    defaultPrizeConfig = new PrizeConfig();
  });

  test('구입 금액에 대한 수익률을 계산한다.', () => {
    const PURCHASE_MONEY = 8000;
    const fakeStats: WinningStatistic = new Map([
      ['FIRST', 0],
      ['SECOND', 0],
      ['THIRD', 0],
      ['FOURTH', 0],
      ['FIFTH', 1],
    ]);

    const lottoResult = new LottoResult(
      defaultPrizeConfig,
      PURCHASE_MONEY,
      fakeStats
    );

    expect(lottoResult.calculateProfitRate()).toBeCloseTo(62.5);
  });
});
