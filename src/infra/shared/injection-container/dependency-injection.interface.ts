type constructor<T> = {
  new (...args: any[]): T;
};

interface DependecyInjection {
  getInstance<T>(token: constructor<T>): T;
}

export { DependecyInjection };
