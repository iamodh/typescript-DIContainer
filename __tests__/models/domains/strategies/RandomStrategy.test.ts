import LottoConfig from '../../../../src/models/configs/LottoConfig';
import RandomStrategy from '../../../../src/models/domains/strategies/RandomStrategy';

describe('랜덤 전략 클래스 테스트', () => {
  test('lottoConfig에서 정의한 설정에 따라 랜덤한 번호를 생성한다.', () => {
    const lottoConfig = new LottoConfig();
    const randomStrategy = new RandomStrategy(lottoConfig);

    expect(randomStrategy.generate().length).toBe(
      lottoConfig.getNumbersCount()
    );
  });
});
