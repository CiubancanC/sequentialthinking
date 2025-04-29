/**
 * Represents a thought in the CEOMCP thinking process.
 * This is the core domain entity for the application.
 */
export declare class Thought {
    private _thought;
    private _thoughtNumber;
    private _totalThoughts;
    private _nextThoughtNeeded;
    private _isRevision?;
    private _revisesThought?;
    private _branchFromThought?;
    private _branchId?;
    private _needsMoreThoughts?;
    constructor(thought: string, thoughtNumber: number, totalThoughts: number, nextThoughtNeeded: boolean, isRevision?: boolean, revisesThought?: number, branchFromThought?: number, branchId?: string, needsMoreThoughts?: boolean);
    get thought(): string;
    get thoughtNumber(): number;
    get totalThoughts(): number;
    get nextThoughtNeeded(): boolean;
    get isRevision(): boolean | undefined;
    get revisesThought(): number | undefined;
    get branchFromThought(): number | undefined;
    get branchId(): string | undefined;
    get needsMoreThoughts(): boolean | undefined;
    adjustTotalThoughts(newTotal: number): void;
    isPartOfBranch(): boolean;
    isRevisingAnotherThought(): boolean;
    static create(data: {
        thought: string;
        thoughtNumber: number;
        totalThoughts: number;
        nextThoughtNeeded: boolean;
        isRevision?: boolean;
        revisesThought?: number;
        branchFromThought?: number;
        branchId?: string;
        needsMoreThoughts?: boolean;
    }): Thought;
    toObject(): Record<string, any>;
}
