import { describe, it, expect } from 'vitest';
import { HelloWorld } from '../../src/domain/models/helloWorld';

describe('HelloWorld', () => {
  it('should create a valid HelloWorld instance', () => {
    const helloWorld = new HelloWorld('Hello');
    
    expect(helloWorld).toBeInstanceOf(HelloWorld);
    expect(helloWorld.message).toBe('Hello');
    expect(helloWorld.name).toBeUndefined();
  });
  
  it('should create a valid HelloWorld instance with a name', () => {
    const helloWorld = new HelloWorld('Hello', 'John');
    
    expect(helloWorld).toBeInstanceOf(HelloWorld);
    expect(helloWorld.message).toBe('Hello');
    expect(helloWorld.name).toBe('John');
  });
  
  it('should throw an error when creating a HelloWorld with an empty message', () => {
    expect(() => new HelloWorld('', 'John')).toThrowError('Message must not be empty');
  });
  
  it('should return the correct greeting without a name', () => {
    const helloWorld = new HelloWorld('Hello');
    expect(helloWorld.getGreeting()).toBe('Hello, World!');
  });
  
  it('should return the correct greeting with a name', () => {
    const helloWorld = new HelloWorld('Hello', 'John');
    expect(helloWorld.getGreeting()).toBe('Hello, John!');
  });
  
  it('should create a HelloWorld from raw data using the factory method', () => {
    const data = {
      message: 'Hello',
      name: 'John'
    };
    
    const helloWorld = HelloWorld.create(data);
    
    expect(helloWorld).toBeInstanceOf(HelloWorld);
    expect(helloWorld.message).toBe('Hello');
    expect(helloWorld.name).toBe('John');
  });
  
  it('should convert a HelloWorld to a plain object', () => {
    const helloWorld = new HelloWorld('Hello', 'John');
    
    const obj = helloWorld.toObject();
    
    expect(obj).toEqual({
      message: 'Hello',
      name: 'John'
    });
  });
  
  it('should convert a HelloWorld without a name to a plain object', () => {
    const helloWorld = new HelloWorld('Hello');
    
    const obj = helloWorld.toObject();
    
    expect(obj).toEqual({
      message: 'Hello'
    });
  });
});
