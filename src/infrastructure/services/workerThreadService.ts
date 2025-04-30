/**
 * Worker Thread Service for handling multithreaded operations.
 * This service provides methods for running tasks in separate threads.
 */
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { Logger } from '../../utils/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Options for the worker thread pool.
 */
export interface WorkerThreadPoolOptions {
  /**
   * The minimum number of worker threads to keep alive.
   */
  minThreads?: number;

  /**
   * The maximum number of worker threads to create.
   */
  maxThreads?: number;

  /**
   * The maximum number of tasks to queue before rejecting new tasks.
   */
  maxQueue?: number;

  /**
   * The idle timeout in milliseconds before a worker thread is terminated.
   */
  idleTimeout?: number;
}

/**
 * Task to be executed in a worker thread.
 */
export interface WorkerTask<T, R> {
  /**
   * The task ID.
   */
  id: string;

  /**
   * The task data.
   */
  data: T;

  /**
   * The file path of the module containing the task function.
   */
  modulePath: string;

  /**
   * The name of the exported function to execute.
   */
  functionName: string;
}

/**
 * Result of a worker thread task.
 */
export interface WorkerResult<R> {
  /**
   * The task ID.
   */
  taskId: string;

  /**
   * The result of the task.
   */
  result: R;

  /**
   * Error message if the task failed.
   */
  error?: string;
}

/**
 * Service for managing worker threads.
 */
export class WorkerThreadService {
  private workers: Map<number, Worker> = new Map();
  private taskQueue: Array<{ task: WorkerTask<any, any>, resolve: Function, reject: Function }> = [];
  private activeWorkers: Set<number> = new Set();
  private nextWorkerId: number = 1;
  private options: Required<WorkerThreadPoolOptions>;

  /**
   * Creates a new WorkerThreadService.
   * @param options Options for the worker thread pool
   */
  constructor(options: WorkerThreadPoolOptions = {}) {
    this.options = {
      minThreads: options.minThreads || 2,
      maxThreads: options.maxThreads || 8,
      maxQueue: options.maxQueue || 100,
      idleTimeout: options.idleTimeout || 60000, // 1 minute
    };

    // Initialize the minimum number of worker threads
    this.initializeWorkers();

    Logger.info(`WorkerThreadService initialized with ${this.options.minThreads} min threads, ${this.options.maxThreads} max threads`);
  }

  /**
   * Initializes the minimum number of worker threads.
   */
  private initializeWorkers(): void {
    for (let i = 0; i < this.options.minThreads; i++) {
      this.createWorker();
    }
  }

  /**
   * Creates a new worker thread.
   * @returns The worker ID
   */
  private createWorker(): number {
    const workerId = this.nextWorkerId++;
    
    // Get the directory of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    // Create a new worker thread
    const worker = new Worker(path.join(__dirname, 'workerThread.js'), {
      workerData: { workerId }
    });

    // Set up event handlers
    worker.on('message', (result: WorkerResult<any>) => {
      this.handleWorkerResult(workerId, result);
    });

    worker.on('error', (error) => {
      Logger.error(`Worker ${workerId} error:`, Logger.formatError(error));
      this.workers.delete(workerId);
      this.activeWorkers.delete(workerId);
      
      // Create a new worker to replace the failed one if we're below the minimum
      if (this.workers.size < this.options.minThreads) {
        this.createWorker();
      }
      
      // Process the next task in the queue
      this.processQueue();
    });

    worker.on('exit', (code) => {
      Logger.debug(`Worker ${workerId} exited with code ${code}`);
      this.workers.delete(workerId);
      this.activeWorkers.delete(workerId);
      
      // Create a new worker to replace the exited one if we're below the minimum
      if (this.workers.size < this.options.minThreads) {
        this.createWorker();
      }
    });

    // Store the worker
    this.workers.set(workerId, worker);
    Logger.debug(`Created worker ${workerId}`);

    return workerId;
  }

  /**
   * Handles the result of a worker thread task.
   * @param workerId The worker ID
   * @param result The task result
   */
  private handleWorkerResult(workerId: number, result: WorkerResult<any>): void {
    // Find the task in the queue
    const taskIndex = this.taskQueue.findIndex(item => item.task.id === result.taskId);
    
    if (taskIndex !== -1) {
      const { resolve, reject } = this.taskQueue[taskIndex];
      
      // Remove the task from the queue
      this.taskQueue.splice(taskIndex, 1);
      
      // Mark the worker as inactive
      this.activeWorkers.delete(workerId);
      
      // Resolve or reject the promise based on the result
      if (result.error) {
        reject(new Error(result.error));
      } else {
        resolve(result.result);
      }
      
      // Process the next task in the queue
      this.processQueue();
      
      // Schedule worker termination if it's idle
      this.scheduleWorkerTermination(workerId);
    }
  }

  /**
   * Schedules a worker for termination if it's idle.
   * @param workerId The worker ID
   */
  private scheduleWorkerTermination(workerId: number): void {
    // Only terminate workers if we have more than the minimum
    if (this.workers.size <= this.options.minThreads) {
      return;
    }
    
    // Schedule termination after the idle timeout
    setTimeout(() => {
      // Only terminate if the worker is still inactive and we have more than the minimum
      if (!this.activeWorkers.has(workerId) && this.workers.size > this.options.minThreads) {
        const worker = this.workers.get(workerId);
        if (worker) {
          Logger.debug(`Terminating idle worker ${workerId}`);
          worker.terminate();
          this.workers.delete(workerId);
        }
      }
    }, this.options.idleTimeout);
  }

  /**
   * Processes the next task in the queue.
   */
  private processQueue(): void {
    // If there are no tasks in the queue, return
    if (this.taskQueue.length === 0) {
      return;
    }
    
    // Find an available worker
    let availableWorkerId: number | null = null;
    
    for (const [workerId] of this.workers) {
      if (!this.activeWorkers.has(workerId)) {
        availableWorkerId = workerId;
        break;
      }
    }
    
    // If no worker is available, create a new one if possible
    if (availableWorkerId === null && this.workers.size < this.options.maxThreads) {
      availableWorkerId = this.createWorker();
    }
    
    // If a worker is available, assign the next task
    if (availableWorkerId !== null) {
      const nextTask = this.taskQueue[0];
      const worker = this.workers.get(availableWorkerId);
      
      if (worker && nextTask) {
        // Mark the worker as active
        this.activeWorkers.add(availableWorkerId);
        
        // Send the task to the worker
        worker.postMessage(nextTask.task);
        
        // Remove the task from the beginning of the queue
        this.taskQueue.shift();
        
        Logger.debug(`Assigned task ${nextTask.task.id} to worker ${availableWorkerId}`);
      }
    }
  }

  /**
   * Executes a task in a worker thread.
   * @param task The task to execute
   * @returns A promise that resolves with the result of the task
   * @throws Error if the task queue is full
   */
  async executeTask<T, R>(task: Omit<WorkerTask<T, R>, 'id'>): Promise<R> {
    // Check if the task queue is full
    if (this.taskQueue.length >= this.options.maxQueue) {
      throw new Error(`Task queue is full (max: ${this.options.maxQueue})`);
    }
    
    // Create a unique task ID
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create a promise that will be resolved when the task completes
    return new Promise<R>((resolve, reject) => {
      // Add the task to the queue
      this.taskQueue.push({
        task: { ...task, id: taskId },
        resolve,
        reject
      });
      
      // Process the queue
      this.processQueue();
    });
  }

  /**
   * Terminates all worker threads.
   */
  async terminate(): Promise<void> {
    Logger.info(`Terminating ${this.workers.size} worker threads`);
    
    // Terminate all workers
    const terminationPromises = Array.from(this.workers.values()).map(worker => {
      return new Promise<void>((resolve) => {
        worker.once('exit', () => resolve());
        worker.terminate();
      });
    });
    
    // Wait for all workers to terminate
    await Promise.all(terminationPromises);
    
    // Clear the maps and sets
    this.workers.clear();
    this.activeWorkers.clear();
    this.taskQueue = [];
    
    Logger.info('All worker threads terminated');
  }
}
