import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoConfig from './models/configs/LottoConfig.js';
import PrizeConfig from './models/configs/PrizeConfig.js';
import LottoMachine from './models/domains/LottoMachine.js';
import FIXED_NUMBERS from './constants/fixedNumbers.js';
import FixedStrategy from './models/domains/strategies/FixedStrategy.js';
import RandomStrategy from './models/domains/strategies/RandomStrategy.js';
import LottoChecker from './models/services/LottoChecker.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  #container;

  constructor() {
    this.#container = new DIContainer();
  }
  async run(env) {
    this.#injectDependencies(env);
    const controller = this.#container.resolve('lottoController');
    await controller.start();
  }

  #injectDependencies(env) {
    const container = this.#container;

    container.register('lottoConfig', LottoConfig, 'singleton');
    container.register('prizeConfig', PrizeConfig, 'singleton');

    container.register('inputView', InputView, 'singleton', ['lottoConfig']);
    container.register('outputView', OutputView, 'singleton', ['prizeConfig']);

    if (env === 'dev') {
      container.register('fixedStrategy', FixedStrategy, 'singleton', [
        FIXED_NUMBERS,
      ]);
      container.register('lottoMachine', LottoMachine, 'transient', [
        'lottoConfig',
        'fixedStrategy',
      ]);
    } else {
      container.register('randomStrategy', RandomStrategy, 'singleton', [
        'lottoConfig',
      ]);
      container.register('lottoMachine', LottoMachine, 'transient', [
        'lottoConfig',
        'randomStrategy',
      ]);
    }

    container.register('lottoChecker', LottoChecker, 'singleton');
    container.register('lottoController', LottoController, 'transient', [
      'lottoConfig',
      'prizeConfig',
      'inputView',
      'outputView',
      'lottoMachine',
      'lottoChecker',
    ]);

    const controller = container.resolve('lottoController');
  }
}

export default App;
