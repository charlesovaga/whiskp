// declarations.d.ts
declare module 'paystack-api' {
    export class Paystack {
      constructor(secretKey: string, config?: Record<string, any>);
      // Optionally: define any known methods here
    }
  }