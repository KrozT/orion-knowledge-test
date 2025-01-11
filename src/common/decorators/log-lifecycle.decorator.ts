import { Logger } from '@nestjs/common';

/**
 * Decorator that logs the lifecycle events (`onModuleInit` and `onModuleDestroy`) of a NestJS module or service.
 *
 * When applied to a class, this decorator overrides the `onModuleInit` and `onModuleDestroy` methods to log
 * messages indicating when the module or service has been initialized and destroyed. It maintains the original
 * functionality of these lifecycle hooks if they are already implemented.
 *
 * **Usage:** Apply this decorator to a module or service to automatically log its initialization and destruction.
 *
 * @returns A class decorator that logs module lifecycle events (`initialized` and `destroyed`).
 */
export function LogLifecycleDecorator(): ClassDecorator {
  return function (constructor: any) {
    const originalInit = constructor.prototype.onModuleInit;
    const originalDestroy = constructor.prototype.onModuleDestroy;

    constructor.prototype.onModuleInit = function () {
      const logger = this.logger || new Logger(constructor.name);
      logger.log(`${constructor.name} initialized`);
      if (originalInit) {
        originalInit.apply(this);
      }
    };

    constructor.prototype.onModuleDestroy = function () {
      const logger = this.logger || new Logger(constructor.name);
      logger.log(`${constructor.name} destroyed`);
      if (originalDestroy) {
        originalDestroy.apply(this);
      }
    };
  };
}
