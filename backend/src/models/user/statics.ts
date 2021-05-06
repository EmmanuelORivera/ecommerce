import { IUserDocument, IUserModel } from './types';
export async function findOneOrCreate(
  this: IUserModel,
  userId: IUserDocument['_id']
): Promise<IUserDocument> {
  const record = await this.findOne({ userId });

  if (record) {
    return record;
  } else {
    return this.create({ userId });
  }
}
