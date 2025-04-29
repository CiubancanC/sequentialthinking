import { describe, it, expect, beforeEach } from 'vitest';
import { HelloWorldServiceImpl } from '../../src/domain/services/helloWorldService';
import { HelloWorldRepository } from '../../src/domain/interfaces/helloWorldInterfaces';
import { HelloWorld } from '../../src/domain/models/helloWorld';

// Mock repository for testing
class MockHelloWorldRepository implements HelloWorldRepository {
  private messages: HelloWorld[] = [];

  addMessage(helloWorld: HelloWorld): void {
    this.messages.push(helloWorld);
  }

  getAllMessages(): HelloWorld[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }
}

describe('HelloWorldServiceImpl', () => {
  let repository: HelloWorldRepository;
  let service: HelloWorldServiceImpl;

  beforeEach(() => {
    repository = new MockHelloWorldRepository();
    service = new HelloWorldServiceImpl(repository);
  });

  it('should process a message and add it to the repository', () => {
    const messageData = {
      message: 'Hello',
      name: 'John'
    };

    const result = service.processMessage(messageData);

    expect(result).toBeInstanceOf(HelloWorld);
    expect(result.message).toBe('Hello');
    expect(result.name).toBe('John');
    expect(service.getMessageHistory()).toHaveLength(1);
  });

  it('should process a message without a name', () => {
    const messageData = {
      message: 'Hello'
    };

    const result = service.processMessage(messageData);

    expect(result).toBeInstanceOf(HelloWorld);
    expect(result.message).toBe('Hello');
    expect(result.name).toBeUndefined();
    expect(service.getMessageHistory()).toHaveLength(1);
  });

  it('should return the correct message history', () => {
    // Add some messages
    service.processMessage({
      message: 'Hello',
      name: 'John'
    });

    service.processMessage({
      message: 'Hi',
      name: 'Jane'
    });

    const history = service.getMessageHistory();
    
    expect(history).toHaveLength(2);
    expect(history[0].message).toBe('Hello');
    expect(history[0].name).toBe('John');
    expect(history[1].message).toBe('Hi');
    expect(history[1].name).toBe('Jane');
  });

  it('should reset state correctly', () => {
    // Add some messages
    service.processMessage({
      message: 'Hello',
      name: 'John'
    });

    service.processMessage({
      message: 'Hi',
      name: 'Jane'
    });

    // Reset state
    service.resetState();

    expect(service.getMessageHistory()).toHaveLength(0);
  });
});
