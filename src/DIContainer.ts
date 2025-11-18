import 'reflect-metadata';

type ContainerScope = 'transient' | 'singleton';
type Constructor<T> = new (...args: any[]) => T;
type ServiceArg = unknown;

interface ServiceData {
  scope: ContainerScope;
  args: ServiceArg[];
  instance: unknown | null;
}

class DIContainer {
  #services = new Map<Constructor<any>, ServiceData>();

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

    if (target.name === 'LottoMachine') {
      console.log(`\n=== 🐞 DEBUG: ${target.name} 의존성 분석 ===`);
      paramTypes.forEach((pt, index) => {
        console.log(`[${index}] 감지된 타입: ${pt ? pt.name : 'Unknown'}`);
        if (pt && pt.name === 'Object') {
          console.log(
            `    👉 경고: 인터페이스를 사용 중이신가요? 'Object'로 인식되어 undefined가 주입됩니다.`
          );
        }
      });
      console.log('===========================================\n');
    }

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
}

export function Injectable(): ClassDecorator {
  return function (target: Function) {
    // 타입 정보와 함께 데코레이터가 작동하기 위해 reflect-metadata가 필요한 폴리필입니다.
    // 즉시 실행할 필요는 없으며, TypeScript의 emitDecoratorMetadata 옵션이 활성화되어 있으면
    // TypeScript 컴파일러가 자동으로 생성자 매개변수의 타입 정보를 design:paramtypes 키 아래에
    // 메타데이터로 저장해 줍니다. 우리는 단지 이 데코레이터가 실행되었음을 보장하면 됩니다.
  };
}

export default DIContainer;
