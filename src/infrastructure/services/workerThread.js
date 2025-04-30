/**
 * Worker thread implementation for the WorkerThreadService.
 * This file is loaded by the Worker constructor in the WorkerThreadService.
 */
import { parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the worker ID from the worker data
const { workerId } = workerData;

// Listen for messages from the parent thread
parentPort.on('message', async (task) => {
  try {
    // Extract task information
    const { id, data, modulePath, functionName } = task;
    
    // Import the module dynamically
    const moduleUrl = new URL(modulePath, import.meta.url).href;
    const module = await import(moduleUrl);
    
    // Get the function to execute
    const func = module[functionName];
    
    if (typeof func !== 'function') {
      throw new Error(`Function "${functionName}" not found in module "${modulePath}"`);
    }
    
    // Execute the function
    const result = await func(data);
    
    // Send the result back to the parent thread
    parentPort.postMessage({
      taskId: id,
      result
    });
  } catch (error) {
    // Send the error back to the parent thread
    parentPort.postMessage({
      taskId: task.id,
      result: null,
      error: error.message
    });
  }
});

// Notify the parent thread that the worker is ready
parentPort.postMessage({
  taskId: 'worker-init',
  result: { workerId, status: 'ready' }
});
