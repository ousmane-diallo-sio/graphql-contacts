import { BadRequestError } from "../../../exceptions/GraphQLContactError";
import { contactRepository } from "./Repository";
import { CreateContactSchema, UpdateContactSchema } from "./ZodSchema";


export class ContactGraphQLResolver {

  static instance = new ContactGraphQLResolver();

  private constructor() { }

  async getContact(args: { id: string }) {
    return await contactRepository.findById(args.id);
  }

  async getAllContacts(args: { id: string }) {
    return await contactRepository.findAll({ where: { referal: args.id } });
  }

  async createContact(args: { data: unknown }) {
    const validation = CreateContactSchema.safeParse(args.data);
    if (!validation.success) {
      throw new BadRequestError(validation.error.errors[0].message);
    }

    return await contactRepository.create(validation.data);
  }

  async updateContact(args: { id: string, data: unknown }) {
    const validation = UpdateContactSchema.safeParse(args?.data);
    if (!validation.success) {
      throw new BadRequestError(validation.error.errors[0].message);
    }

    return await contactRepository.update(args.id, validation.data);
  }

  async deleteContact(args: { id: string }) {
    return await contactRepository.delete(args.id);
  }

}