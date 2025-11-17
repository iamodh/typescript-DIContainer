import LottoResult from '../models/domains/LottoResult.js';
import WinningLotto from '../models/domains/WinningLotto.js';

class LottoController {
  #lottoConfig;
  #prizeConfig;
  #inputView;
  #outputView;
  #lottoMachine;
  #lottoChecker;

  constructor(
    lottoConfig,
    prizeConfig,
    inputView,
    outputView,
    lottoMachine,
    lottoChecker
  ) {
    this.#lottoConfig = lottoConfig;
    this.#prizeConfig = prizeConfig;
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#lottoChecker = lottoChecker;
    this.#lottoMachine = lottoMachine;
  }

  async start() {
    while (true) {
      try {
        const purchaseMoney = await this.#inputView.getPurchasePrice();
        this.#outputView.printNewLine();

        const lottos = this.#lottoMachine.execute(purchaseMoney);
        this.#outputView.printPurchasedLottos(lottos);
        this.#outputView.printNewLine();

        const winningNumbers = await this.#inputView.getWinningNumbers();
        const bonusNumber = await this.#inputView.getBonusNumber();
        this.#outputView.printNewLine();

        const winningLotto = new WinningLotto(
          this.#lottoConfig,
          winningNumbers,
          bonusNumber
        );

        const stats = this.#lottoChecker.calculateStats(lottos, winningLotto);
        this.#outputView.printWinningStatistic(stats);

        const lottoResult = new LottoResult(
          this.#prizeConfig,
          purchaseMoney,
          stats
        );
        this.#outputView.printProfitRate(lottoResult.calculateProfitRate());
        return;
      } catch (error) {
        this.#outputView.printError(error.message);
      }
    }
  }
}

export default LottoController;
