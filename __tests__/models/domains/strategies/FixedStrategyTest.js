import FixedStrategy from '../../../../src/models/domains/strategies/FixedStrategy';

describe('고정 전략 클래스 테스트', () => {
  test('전달된 배열과 같은 고정된 번호를 생성한다.', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const fixedStrategy = new FixedStrategy(array);

    expect(fixedStrategy.generate()).toEqual(array);
  });
});
