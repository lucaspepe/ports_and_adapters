type constructor<T> = {
  new (...args: any[]): T;
};

interface DependecyInjection {
  resolve<T>(token: constructor<T>): T;
}

export { DependecyInjection };
