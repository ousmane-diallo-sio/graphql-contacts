import { NextFunction, Request, Response } from "express";
import { expressjwt } from "express-jwt";
import EnvConfig from "./config/EnvConfig";
import { formatResponse } from "./utils/response";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    console.log(`${yellow}${req.method}${reset} ${req.originalUrl} --> ${res.statusCode}`);
  });

  next();
}

export const jwt = expressjwt({ secret: EnvConfig.JWT_SECRET, algorithms: ['HS256'] });

export const graphqljwt = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === "/graphql") {
    return expressjwt({ secret: EnvConfig.JWT_SECRET, algorithms: ['HS256'], credentialsRequired: false })(req, res, next);
  }
  next();
}

export const authErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    if (req.originalUrl === "/graphql") return next();
    return formatResponse(res, { status: 401, messages: [{ type: "error", message: "invalid-token" }] });
  }
  next();
}