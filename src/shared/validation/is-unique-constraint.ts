import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintInput } from "./is-unique";
import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqueConstraintInput = validationArguments.constraints[0];
    const exists = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return exists? false: true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `This ${validationArguments.property} already exists`;
  }

}