/**
 * Data Transfer Object for HelloWorld input.
 * Used to transfer HelloWorld data from the infrastructure layer to the application layer.
 */
export interface HelloWorldInputDto {
  message: string;
  name?: string;
}

/**
 * Data Transfer Object for HelloWorld output.
 * Used to transfer HelloWorld data from the application layer to the infrastructure layer.
 */
export interface HelloWorldOutputDto {
  greeting: string;
  messageHistoryLength: number;
}

/**
 * Data Transfer Object for error output.
 * Used to transfer error information from the application layer to the infrastructure layer.
 */
export interface ErrorOutputDto {
  error: string;
  status: string;
}
