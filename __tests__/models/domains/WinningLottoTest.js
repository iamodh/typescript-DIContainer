import LottoConfig from '../../../src/models/configs/LottoConfig';
import WinningLotto from '../../../src/models/domains/WinningLotto';

describe('당첨 로또 클래스 테스트', () => {
  let defaultLottoConfig;

  beforeEach(() => {
    defaultLottoConfig = new LottoConfig();
  });

  test('당점 로또 번호의 개수가 설정과 맞지 않다면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(defaultLottoConfig, [1, 2, 3, 4, 5], 6);
    }).toThrow('[ERROR]');
  });

  test('당첨 로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(defaultLottoConfig, [1, 2, 3, 4, 5, 5], 6);
    }).toThrow('[ERROR]');
  });

  test('보너스 로또 번호가 당첨 로또 번호와 중복되면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(defaultLottoConfig, [1, 2, 3, 4, 5, 6], 6);
    }).toThrow('[ERROR]');
  });

  test('로또의 등수를 계산한다.', () => {
    const mockLotto = {
      numbers: [1, 2, 3, 4, 5, 6],
      matchCount: jest.fn().mockReturnValue(5),
      contains: jest.fn().mockReturnValue(true),
    };

    const winningLotto = new WinningLotto(
      defaultLottoConfig,
      [1, 2, 3, 4, 5, 7],
      6
    );
    expect(winningLotto.calculateRank(mockLotto)).toBe('SECOND');
  });
});
