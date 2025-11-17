import DIContainer from '../src/DIContainer';

describe('DI컨테이너 클래스 테스트', () => {
  describe('register 메서드 테스트', () => {
    test('serviceName과 service를 입력 받아 컨테이너에 등록해야 한다.', () => {
      const container = new DIContainer();

      const SERVICE_NAME = 'mockService';
      class MockService {}

      container.register(SERVICE_NAME, MockService, 'transient');
      expect(container.hasService(SERVICE_NAME)).toBe(true);
    });
  });
  describe('resolve 메서드 테스트', () => {
    test('등록된 service를 찾아 인스턴스를 생성 후 반환해야 한다.', () => {
      const container = new DIContainer();

      const SERVICE_NAME = 'mockService';
      class MockService {}

      container.register(SERVICE_NAME, MockService, 'transient');

      expect(container.resolve(SERVICE_NAME)).toBeInstanceOf(MockService);
    });
    test('service가 등록되지 않았다면 예외가 발생한다.', () => {
      const container = new DIContainer();

      const SERVICE_NAME = 'noService';

      expect(() => container.resolve(SERVICE_NAME)).toThrow('[ERROR]');
    });

    test('의존성을 가지고 있다면 생성자에 주입한 후 인스턴스를 생성한다.', () => {
      const container = new DIContainer();

      const SERVICE_NAME = 'mockService';
      const DEPENDENCY_NAME = 'mockDependency';

      class MockDependency {}

      class MockService {
        dependency;
        constructor(dependency) {
          this.dependency = dependency;
        }
      }

      container.register(DEPENDENCY_NAME, MockDependency, 'transient');
      container.register(SERVICE_NAME, MockService, 'transient', [
        DEPENDENCY_NAME,
      ]);

      const instance = container.resolve(SERVICE_NAME);

      expect(instance).toBeInstanceOf(MockService);
      expect(instance.dependency).toBeInstanceOf(MockDependency);
    });
  });

  test('인자에 의존성 이외의 값이 전달되면, 인스턴스화 하지 않고 생성자 함수로 전달한다.', () => {
    const container = new DIContainer();
    const SERVICE_NAME = 'mockService';
    const DEPENDENCY_NAME = 'mockDependency';

    class MockDependency {}
    class MockService {
      value1;
      value2;
      dependency;
      constructor(value1, value2, dependency) {
        this.value1 = value1;
        this.value2 = value2;
        this.dependency = dependency;
      }
    }

    container.register(DEPENDENCY_NAME, MockDependency, 'transient');
    container.register(SERVICE_NAME, MockService, 'transient', [
      1,
      2,
      DEPENDENCY_NAME,
    ]);
    const instance = container.resolve(SERVICE_NAME);
    expect(instance).toBeInstanceOf(MockService);
    expect(instance.value1).toBe(1);
    expect(instance.dependency).toBeInstanceOf(MockDependency);
  });

  test('singleton 키워드로 register된 서비스는 하나만 존재해야 한다.', () => {
    const container = new DIContainer();

    const SERVICE_NAME = 'mockService';
    class MockService {}

    container.register(SERVICE_NAME, MockService, 'singleton');

    const CLIENT_NAME = 'mockClient';
    class MockClient {
      service;
      constructor(service) {
        this.service = service;
      }
    }

    container.register(CLIENT_NAME, MockClient, 'transient', [SERVICE_NAME]);
    const clientA = container.resolve(CLIENT_NAME);
    const clientB = container.resolve(CLIENT_NAME);

    expect(clientA.service === clientB.service).toBe(true);
  });
});
