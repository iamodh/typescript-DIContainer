const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = Object.freeze({
  NUMBERS_DUPLICATES: `${ERROR_PREFIX} 로또 번호는 중복되는 숫자를 가지면 안 됩니다.`,
  BONUS_NUMBER_DUPLICATES: `${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복되면 안 됩니다.`,
  NUMBER_NOT_POSITIVE: `${ERROR_PREFIX} 입력 값이 0보다 큰 양수가 아닙니다.`,
});

export function getInvalidCountMessage(count) {
  return `${ERROR_PREFIX} 로또 번호의 개수는 ${count}개여야 합니다.`;
}

export function getInvalidPricaMessage(count) {
  return `${ERROR_PREFIX} 구입 금액은 ${count}원으로 나누어져야 합니다.`;
}

export function getNumberNotInRangeMessage(from, to) {
  return `${ERROR_PREFIX} 입력 값은 ${from}부터 ${to} 사이여야 합니다.`;
}
