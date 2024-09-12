import { Request, RequestHandler, Response, Router } from "express";
import { userRepository } from "./Repository";
import { formatResponse } from "../../../lib/utils/response";
import { jwt } from "../../../lib/middlewares";
import { z } from "zod";
import { omit } from "../../../lib/utils";
import { ServerMessage } from "../../../types/response";
import { CreateUserSchema, UpdateUserSchema, UserLoginSchema } from "./ZodSchema";
import { FedodoError } from "../../../exceptions/FedodoError";

const userController = Router();

const getOneById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const reqUserId = req.auth!.id;

  if (id !== reqUserId) {
    return formatResponse(res, {
      status: 403,
      messages: [{ type: "error", message: "You are not authorized to access this resource" }],
    });
  }

  try {
    const user = await userRepository.findById(id);
    if (!user) {
      return formatResponse(res, { status: 404, messages: [{ type: "error", message: "User not found" }] });
    }

    return formatResponse(res, { status: 200, data: user });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while fetching user' });
  }
};

const getAll: RequestHandler = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    return formatResponse(res, { status: 200, data: users });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while fetching users' });
  }
};

const createOne: RequestHandler = async (req, res) => {
  const validation = CreateUserSchema.safeParse(req.body);
  if (!validation.success) {
    return formatResponse(res, {
      status: 400,
      messages: validation.error.issues.map((issue) => ({ type: "error", message: issue.message })),
    });
  }

  try {
    const { data, messages, jwt } = await userRepository.create(validation.data);

    return formatResponse(res, {
      status: 200,
      data: data,
      messages,
      jwt
    });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while creating user' });
  }
};

const updateOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const reqUserId = req.auth!.id;

  if (id !== reqUserId) {
    return formatResponse(res, {
      status: 403,
      messages: [{ type: "error", message: "You are not authorized to access this resource" }],
    });
  }

  const validation = UpdateUserSchema.safeParse(req.body);
  if (!validation.success) {
    return formatResponse(res, {
      status: 400,
      messages: validation.error.issues.map((issue) => ({ type: "error", message: issue.message })),
    });
  }

  try {
    const { data, messages, jwt } = await userRepository.update(id, validation.data);
    return formatResponse(res, { status: 200, data, messages, jwt });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while updating user' });
  }
}

const login: RequestHandler = async (req, res) => {
  const validation = UserLoginSchema.safeParse(req.body);
  if (!validation.success) {
    return formatResponse(res, {
      status: 400,
      messages: validation.error.issues.map((issue) => ({ type: "error", message: issue.message })),
    });
  }

  try {
    const user = await userRepository.findByEmailForLogin(validation.data.email);
    if (!user) {
      return formatResponse(res, {
        status: 404,
        messages: [{ type: "error", message: "User not found" }],
      });
    }

    if (!user.verifyPassword(validation.data.password)) {
      return formatResponse(res, {
        status: 401,
        messages: [{ type: "error", message: "Invalid email or password" }],
      });
    }

    return formatResponse(res, {
      status: 200,
      data:  omit(user, ["password", "salt"]),
      jwt: user.generateToken(),
    });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while logging in' });
  }
};

const deleteOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const reqUserId = req.auth!.id;

  if (id !== reqUserId) {
    return formatResponse(res, {
      status: 403,
      messages: [{ type: "error", message: "You are not authorized to access this resource" }],
    });
  }

  try {
    await userRepository.delete(id);
    return formatResponse(res, { status: 200, messages: [{ type: "success", message: "User deleted successfully" }] });
  } catch (error) {
    FedodoError.sendFormatedResponse(res, error, { message: 'An error occured while deleting user' });
  }
};

userController.post("/", createOne);
userController.patch("/:id", jwt, updateOne);
userController.get("/:id", jwt, getOneById);
userController.post("/login", login);
userController.get("/", jwt, getAll);
userController.delete("/:id", jwt, deleteOne);

export default userController;