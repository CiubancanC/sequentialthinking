/**
 * Agile Processing Service for treating prompts as tickets in an agile pipeline.
 * This service provides methods for processing prompts through an agile workflow.
 */
import { Logger } from '../../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Status of a prompt ticket in the agile pipeline.
 */
export enum TicketStatus {
  CREATED = 'created',
  REQUIREMENTS = 'requirements',
  DESIGN = 'design',
  IMPLEMENTATION = 'implementation',
  TESTING = 'testing',
  REVIEW = 'review',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

/**
 * Represents a prompt ticket in the agile pipeline.
 */
export interface PromptTicket {
  /**
   * The ticket ID.
   */
  id: string;

  /**
   * The role associated with the ticket.
   */
  role: string;

  /**
   * The context or problem description.
   */
  context: string;

  /**
   * The current status of the ticket.
   */
  status: TicketStatus;

  /**
   * The timestamp when the ticket was created.
   */
  createdAt: Date;

  /**
   * The timestamp when the ticket was last updated.
   */
  updatedAt: Date;

  /**
   * The history of status changes.
   */
  statusHistory: Array<{
    status: TicketStatus;
    timestamp: Date;
    notes?: string;
  }>;

  /**
   * The requirements gathered for the ticket.
   */
  requirements?: string;

  /**
   * The design approach for the ticket.
   */
  design?: string;

  /**
   * The implementation details for the ticket.
   */
  implementation?: string;

  /**
   * The testing results for the ticket.
   */
  testing?: string;

  /**
   * The review comments for the ticket.
   */
  review?: string;

  /**
   * The final response for the ticket.
   */
  response?: string;

  /**
   * Error message if the ticket processing failed.
   */
  error?: string;
}

/**
 * Interface for the agile processing service.
 */
export interface IAgileProcessingService {
  /**
   * Creates a new prompt ticket.
   * @param role The role associated with the ticket
   * @param context The context or problem description
   * @returns The created ticket
   */
  createTicket(role: string, context: string): PromptTicket;

  /**
   * Updates the status of a prompt ticket.
   * @param ticketId The ticket ID
   * @param status The new status
   * @param notes Optional notes about the status change
   * @returns The updated ticket
   */
  updateTicketStatus(ticketId: string, status: TicketStatus, notes?: string): Promise<PromptTicket>;

  /**
   * Updates a field of a prompt ticket.
   * @param ticketId The ticket ID
   * @param field The field to update
   * @param value The new value
   * @returns The updated ticket
   */
  updateTicketField<K extends keyof PromptTicket>(
    ticketId: string,
    field: K,
    value: PromptTicket[K]
  ): Promise<PromptTicket>;

  /**
   * Gets a prompt ticket by ID.
   * @param ticketId The ticket ID
   * @returns The ticket, or null if not found
   */
  getTicket(ticketId: string): Promise<PromptTicket | null>;

  /**
   * Processes a prompt ticket through the agile pipeline.
   * @param ticketId The ticket ID
   * @returns The processed ticket
   */
  processTicket(ticketId: string): Promise<PromptTicket>;
}

/**
 * Implementation of the agile processing service.
 */
export class AgileProcessingServiceImpl implements IAgileProcessingService {
  private tickets: Map<string, PromptTicket> = new Map();

  /**
   * Creates a new prompt ticket.
   * @param role The role associated with the ticket
   * @param context The context or problem description
   * @returns The created ticket
   */
  createTicket(role: string, context: string): PromptTicket {
    const now = new Date();
    const ticket: PromptTicket = {
      id: uuidv4(),
      role,
      context,
      status: TicketStatus.CREATED,
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        {
          status: TicketStatus.CREATED,
          timestamp: now,
          notes: 'Ticket created'
        }
      ]
    };

    this.tickets.set(ticket.id, ticket);
    Logger.debug(`Created ticket ${ticket.id} for role ${role}`);

    return ticket;
  }

  /**
   * Updates the status of a prompt ticket.
   * @param ticketId The ticket ID
   * @param status The new status
   * @param notes Optional notes about the status change
   * @returns The updated ticket
   * @throws Error if the ticket is not found
   */
  async updateTicketStatus(ticketId: string, status: TicketStatus, notes?: string): Promise<PromptTicket> {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) {
      throw new Error(`Ticket not found: ${ticketId}`);
    }

    const now = new Date();
    ticket.status = status;
    ticket.updatedAt = now;
    ticket.statusHistory.push({
      status,
      timestamp: now,
      notes
    });

    Logger.debug(`Updated ticket ${ticketId} status to ${status}`);
    return ticket;
  }

  /**
   * Updates a field of a prompt ticket.
   * @param ticketId The ticket ID
   * @param field The field to update
   * @param value The new value
   * @returns The updated ticket
   * @throws Error if the ticket is not found
   */
  async updateTicketField<K extends keyof PromptTicket>(
    ticketId: string,
    field: K,
    value: PromptTicket[K]
  ): Promise<PromptTicket> {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) {
      throw new Error(`Ticket not found: ${ticketId}`);
    }

    ticket[field] = value;
    ticket.updatedAt = new Date();

    Logger.debug(`Updated ticket ${ticketId} field ${String(field)}`);
    return ticket;
  }

  /**
   * Gets a prompt ticket by ID.
   * @param ticketId The ticket ID
   * @returns The ticket, or null if not found
   */
  async getTicket(ticketId: string): Promise<PromptTicket | null> {
    return this.tickets.get(ticketId) || null;
  }

  /**
   * Processes a prompt ticket through the agile pipeline.
   * This method orchestrates the movement of a ticket through all stages of the agile pipeline.
   * @param ticketId The ticket ID
   * @returns The processed ticket
   * @throws Error if the ticket is not found or processing fails
   */
  async processTicket(ticketId: string): Promise<PromptTicket> {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) {
      throw new Error(`Ticket not found: ${ticketId}`);
    }

    try {
      // Move the ticket through each stage of the pipeline
      await this.updateTicketStatus(ticketId, TicketStatus.REQUIREMENTS, 'Gathering requirements');
      // Requirements gathering would happen here

      await this.updateTicketStatus(ticketId, TicketStatus.DESIGN, 'Designing solution');
      // Design would happen here

      await this.updateTicketStatus(ticketId, TicketStatus.IMPLEMENTATION, 'Implementing solution');
      // Implementation would happen here

      await this.updateTicketStatus(ticketId, TicketStatus.TESTING, 'Testing solution');
      // Testing would happen here

      await this.updateTicketStatus(ticketId, TicketStatus.REVIEW, 'Reviewing solution');
      // Review would happen here

      await this.updateTicketStatus(ticketId, TicketStatus.COMPLETED, 'Ticket completed');

      return ticket;
    } catch (error) {
      // If an error occurs, update the ticket status to failed
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.updateTicketStatus(ticketId, TicketStatus.FAILED, `Processing failed: ${errorMessage}`);
      await this.updateTicketField(ticketId, 'error', errorMessage);

      Logger.error(`Error processing ticket ${ticketId}:`, Logger.formatError(error));
      throw error;
    }
  }
}
