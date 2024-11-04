import { Response } from "express";
import { formatResponse } from "../lib/utils/response";
import { ServerMessage } from "../types/response";

export class GraphQLContactError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static sendFormatedResponse(res: Response, error: unknown, args?: { status?: number, message?: string }) {
    console.error(`❌ ${res.req?.method} ${res.req?.url} : \n${error}\n`);
    if (error instanceof GraphQLContactError) {
      return formatResponse(res, { 
        status: error.statusCode, 
        messages: [{ type: "error", message: error.message ?? args?.message ?? "An error occurred" }],
      });
    }
    return formatResponse(res, {
      status: args?.status ?? 500,
      messages: [{ type: "error", message: args?.message ?? "An error occurred" }]
    });
  }

}

export class NotFoundError extends GraphQLContactError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends GraphQLContactError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class InternalServerError extends GraphQLContactError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

export class ValidationError extends GraphQLContactError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class UnauthorizedError extends GraphQLContactError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}