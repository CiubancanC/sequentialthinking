/**
 * Configuration for predefined roles.
 */
export declare const roleData: {
    id: string;
    name: string;
    description: string;
    responsibilities: string[];
    expertise: string[];
}[];
/**
 * Configuration for predefined scenarios.
 */
export declare const scenarioData: {
    id: string;
    title: string;
    description: string;
    category: string;
    complexity: string;
    suggestedRoles: string[];
}[];
/**
 * Role aliases mapping.
 */
export declare const roleAliases: Record<string, string[]>;
