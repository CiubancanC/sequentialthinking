import { describe, it, expect, beforeEach } from 'vitest';
import { ProcessHelloWorldUseCase } from '../../src/application/useCases/processHelloWorld';
import { HelloWorldService } from '../../src/domain/interfaces/helloWorldInterfaces';
import { HelloWorld } from '../../src/domain/models/helloWorld';

// Mock HelloWorldService for testing
class MockHelloWorldService implements HelloWorldService {
  private messages: HelloWorld[] = [];

  processMessage(messageData: unknown): HelloWorld {
    const data = messageData as any;
    const helloWorld = HelloWorld.create({
      message: data.message,
      name: data.name
    });
    
    this.messages.push(helloWorld);
    
    return helloWorld;
  }

  getMessageHistory(): HelloWorld[] {
    return [...this.messages];
  }

  resetState(): void {
    this.messages = [];
  }
}

describe('ProcessHelloWorldUseCase', () => {
  let helloWorldService: HelloWorldService;
  let useCase: ProcessHelloWorldUseCase;

  beforeEach(() => {
    helloWorldService = new MockHelloWorldService();
    useCase = new ProcessHelloWorldUseCase(helloWorldService);
  });

  it('should process a message successfully', () => {
    const input = {
      message: 'Hello',
      name: 'John'
    };

    const result = useCase.execute(input);

    expect(result.data).toBeDefined();
    expect(result.error).toBeUndefined();
    expect(result.data?.greeting).toBe('Hello, John!');
    expect(result.data?.messageHistoryLength).toBe(1);
  });

  it('should process a message without a name successfully', () => {
    const input = {
      message: 'Hello'
    };

    const result = useCase.execute(input);

    expect(result.data).toBeDefined();
    expect(result.error).toBeUndefined();
    expect(result.data?.greeting).toBe('Hello, World!');
    expect(result.data?.messageHistoryLength).toBe(1);
  });

  it('should handle errors during processing', () => {
    // Mock a service that throws an error
    const errorService: HelloWorldService = {
      processMessage: () => {
        throw new Error('Test error');
      },
      getMessageHistory: () => [],
      resetState: () => {}
    };
    
    const errorUseCase = new ProcessHelloWorldUseCase(errorService);
    
    const input = {
      message: 'Hello'
    };

    const result = errorUseCase.execute(input);

    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.error).toBe('Test error');
    expect(result.error?.status).toBe('failed');
  });
});
