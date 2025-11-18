import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoConfig from './models/services/configs/LottoConfig.js';
import PrizeConfig from './models/services/configs/PrizeConfig.js';
import LottoMachine from './models/services/LottoMachine.js';
import FixedStrategy from './models/services/strategies/FixedStrategy.js';
import RandomStrategy from './models/services/strategies/RandomStrategy.js';
import LottoChecker from './models/services/LottoChecker.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  #container: DIContainer;

  constructor() {
    this.#container = new DIContainer();
  }
  async run() {
    this.#injectDependencies();
    const controller = this.#container.resolve(LottoController);
    await controller.start();
  }

  #injectDependencies() {
    const container = this.#container;

    container.register(LottoConfig, 'singleton');
    container.register(PrizeConfig, 'singleton');

    container.register(InputView, 'singleton');
    container.register(OutputView, 'singleton');

    container.register(RandomStrategy, 'singleton');
    container.register(LottoMachine, 'transient');

    container.register(LottoChecker, 'singleton');
    container.register(LottoController, 'transient');
  }
}

export default App;
