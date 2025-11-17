import LottoChecker from '../../../src/models/services/LottoChecker';

describe('로또 확인자 클래스 테스트', () => {
  test('lottos와 winningLotto를 받아 stats를 계산해야 한다.', () => {
    const lottoChecker = new LottoChecker();

    const fakeLottos = [
      { dummy: 'lotto1' },
      { dummy: 'lotto2' },
      { dummy: 'lotto3' },
    ];

    const mockWinningLotto = {
      calculateRank: jest.fn(),
    };

    mockWinningLotto.calculateRank
      .mockReturnValueOnce('NONE')
      .mockReturnValueOnce('FOURTH')
      .mockReturnValueOnce('FIFTH');

    const stats = lottoChecker.calculateStats(fakeLottos, mockWinningLotto);

    expect(stats.get('FIRST')).toBe(0);
    expect(stats.get('FOURTH')).toBe(1);
    expect(stats.get('FIFTH')).toBe(1);
  });
});
