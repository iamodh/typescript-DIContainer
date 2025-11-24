# Typescript Di Container

Typescript의 Generic, Decorator 기능과 reflect-metadata를 사용하여 의존성 주입 자동화.

## 실행 방법
```cli
의존성 설치
npm i

테스트
npm run test

컴파일
npm run build

실행
npm run start
```
## 사용 기술
- vitest: Typesciprt로 작성된 테스트 파일을 babel의 도움 없이 ESM Javascript 컴파일을 지원하기 때문에 사용.
- typescript: emitDecoratorMetadata 옵션을 통한 런타임 메타데이터 접근과 Generic을 활용한 Class 타입 생성을 위해 사용.


## 한계
- vitest의 esbuild 컴파일러는 emitDecoratorMetadata를 지원하지 않기 때문에 ApplicationTest와 DIContainer 클래스에 대한 테스트를 진행할 수 없었음.
- 구현한 DI 컨테이너가 메타데이터에서 추상 클래스를 구분하는 기능을 지원하지 않기 때문에 LottoMachine에서 전략 패턴 변경 기능을 구현할 수 없었음.

## 자바스크립트 의존성 등록과의 비교
js
```js
class App {
  #container;

  constructor() {
    this.#container = new DIContainer();
  }
  async run() {
    this.#injectDependencies();
    const controller = this.#container.resolve('lottoController');
    await controller.start();
  }

  #injectDependencies() {
    const container = this.#container;

    container.register('lottoConfig', LottoConfig, 'singleton');
    container.register('prizeConfig', PrizeConfig, 'singleton');

    container.register('inputView', InputView, 'singleton', ['lottoConfig']);
    container.register('outputView', OutputView, 'singleton', ['prizeConfig']);

    container.register('randomStrategy', RandomStrategy, 'singleton', [
      'lottoConfig',
    ]);
    container.register('lottoMachine', LottoMachine, 'transient', [
      'lottoConfig',
      'randomStrategy',
    ]);

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
```
ts
```ts
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
```
### Typescript DIContainer의 효과
> -  string 값을 사용함으로써 의존성 등록과 생성에서 발생할 수 있는 오타 문제를 해결.
> -  App이 Controller와 같이 많은 개수의 의존성를 사용하는 클라이언트의 설계도를 알 필요가 없음. DI 컨테이너의 도입으로 한 줄의 코드로 처리.
> -  프로젝트 규모가 커질수록 DI 컨테이너의 활용도는 상승.

## Javscript DIContainer와의 비교
### register 메서드
js
```js
register(serviceName, serviceDefinition, scope = 'transient', args = []) {
  this.#services.set(serviceName, {
    serviceDefinition,
    scope,
    args,
    instance: null,
  });
}
```
ts
```ts
type ContainerScope = 'transient' | 'singleton';
type Constructor<T> = new (...args: any[]) => T;
type ServiceArg = unknown;

register<T>(
  target: Constructor<T>,
  scope: ContainerScope = 'transient',
  args: ServiceArg[] = []
) {
  this.#services.set(target, {
    scope,
    args,
    instance: null,
  });
}
```

> - 기존 string 값으로 등록하던 클래스를 제네릭을 사용하여 클래스 타입으로 등록
>   - 오타 발생 위험 감소, 코드 간소화
### resolve 메서드
js
```js
resolve(serviceName) {
  const service = this.#services.get(serviceName);

  if (!service) {
    throw new Error(`[ERROR] ${serviceName}이 존재하지 않습니다.`);
  }

  if (service.scope === 'transient') {
    const resolved = [];

    service.args.map((arg) => {
      if (this.#services.has(arg)) {
        resolved.push(this.resolve(arg));
      } else {
        resolved.push(arg);
      }
    });

    return new service.serviceDefinition(...resolved);
  }

  if (service.scope === 'singleton') {
    if (!service.instance) {
      const resolved = [];
      service.args.map((arg) => {
        if (this.#services.has(arg)) {
          resolved.push(this.resolve(arg));
        } else {
          resolved.push(arg);
        }
      });

      service.instance = new service.serviceDefinition(...resolved);
    }
    return service.instance;
  }
}

hasService(serviceName) {
  return this.#services.has(serviceName);
}
}
```
ts
```ts
resolve<T>(target: Constructor<T>) {
  const service = this.#services.get(target);

  if (!service) {
    throw new Error(`[ERROR] ${target.name}이 존재하지 않습니다.`);
  }

  if (service.scope === 'transient') {
    const dependencies = this.resolveDependencies(target);

    const instance = new target(...dependencies);

    return instance;
  }

  if (service.scope === 'singleton') {
    if (!service.instance) {
      const dependencies = this.resolveDependencies(target);

      service.instance = new target(...dependencies);
    }
    return service.instance;
  }
}

private resolveDependencies<T>(target: Constructor<T>) {
  const service = this.#services.get(target);
  const registeredArgs = [...service.args];

  const paramTypes: Constructor<any>[] = Reflect.getMetadata(
    'design:paramtypes',
    target
  );

  const dependencies = (paramTypes || []).map((paramType) => {
    if (!paramType) {
      throw new Error(
        `[ERROR] ${target.name}의 의존성을 인스턴스화할 수 없습니다.`
      );
    }

    if (this.#services.has(paramType)) {
      return this.resolve(paramType);
    }

    // 의존성이 Object(원시 값)인 경우
    if (paramType.name === 'Object') {
      if (registeredArgs.length > 0) {
        return registeredArgs.shift();
      }
      return undefined;
    }
  });

  return dependencies;
}
```

> - string 배열의 의존성 목록을 확인하는 방법에서 Reflect에 저장된 paramTypes를 활용하도록 변경
>   - register시 의존성 배열 목록 전달 불필요
> - 클래스 생성자에 원시값이 등록된 경우 조건문 통해 의존성 인스턴스 생성 생략

### Injectable 데코레이터

```ts
export function Injectable(): ClassDecorator {
  return function (target: Function) {
   
  };
}
```
>  클래스에 해당 데코레이터를 붙이면 emitDecoratorMetadata 설정에 의해 자동으로 reflect-metadata 폴리필이 실행됨.
