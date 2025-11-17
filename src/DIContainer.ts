class DIContainer {
  #services = new Map();

  register(serviceName, serviceDefinition, scope = 'transient', args = []) {
    this.#services.set(serviceName, {
      serviceDefinition,
      scope,
      args,
      instance: null,
    });
  }

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

export default DIContainer;
