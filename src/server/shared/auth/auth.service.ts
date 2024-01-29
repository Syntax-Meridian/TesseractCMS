// Business logic in service files.

interface AuthResult {
  authenticated: boolean;
}

export interface AuthServiceContract {
  authenticate(token: string): Promise<AuthResult>;
}

export class DummyAuthService implements AuthServiceContract {
  async authenticate(_token: string): Promise<AuthResult> {
    return Promise.resolve({ authenticated: true } as AuthResult);
  }
}
