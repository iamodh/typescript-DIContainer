type ContainerScope = 'transient' | 'singleton';
type Constructor = new (...args: any[]) => unknown;
type ServiceArg = string | unknown;

interface ServiceData {
  serviceDefinition: Constructor;
  scope: ContainerScope;
  args: ServiceArg[];
  instance: unknown | null;
}

class DIContainer {
  #services = new Map<string, ServiceData>();

  register(
    serviceName: string,
    serviceDefinition: Constructor,
    scope: ContainerScope = 'transient',
    args: ServiceArg[] = []
  ) {
    this.#services.set(serviceName, {
      serviceDefinition,
      scope,
      args,
      instance: null,
    });
  }

  resolve(serviceName: string) {
    const service = this.#services.get(serviceName);

    if (!service) {
      throw new Error(`[ERROR] ${serviceName}이 존재하지 않습니다.`);
    }

    if (service.scope === 'transient') {
      const resolved = [];

      service.args.map((arg) => {
        if (typeof arg === 'string' && this.#services.has(arg)) {
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
          if (typeof arg === 'string' && this.#services.has(arg)) {
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

  hasService(serviceName: string) {
    return this.#services.has(serviceName);
  }
}

export default DIContainer;
