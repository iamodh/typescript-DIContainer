import LottoConfig from '../../../src/models/configs/LottoConfig';
import LottoMachine from '../../../src/models/domains/LottoMachine';
import RandomStrategy from '../../../src/models/domains/strategies/RandomStrategy';

describe('로또 머신 클래스 테스트', () => {
  test('구매 금액에 맞는 개수의 로또를 구입한다.', () => {
    const lottoConfig = new LottoConfig();
    const randomStrategy = new RandomStrategy(lottoConfig);

    const lottoMachine = new LottoMachine(lottoConfig, randomStrategy);

    const PURCHASE_MONEY = 3000;
    const QUANTITY = 3;

    const lottos = lottoMachine.execute(PURCHASE_MONEY);

    expect(lottos.length).toBe(QUANTITY);
  });
});
