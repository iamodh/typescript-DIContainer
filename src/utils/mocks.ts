import { MissionUtils } from '@woowacourse/mission-utils';

export const mockQuestions = (inputs: string[]) => {
  MissionUtils.Console.readLineAsync = vi.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

export const mockRandoms = (numbers: number[]) => {
  MissionUtils.Random.pickUniqueNumbersInRange = vi.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

export const getLogSpy = () => {
  const logSpy = vi.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};
