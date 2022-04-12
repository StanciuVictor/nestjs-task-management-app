/**
 * Define the DTO as a TS class (using the naming convention for DTO classes in NestJS)
 * This DTO helps, because if I want to modify the params, I can change them here,
 * and not go through all the files and modify them.
 */

/**
 * Create validator, so the title and description must not be empty
 * The validator also takes care of the errors and presents them nicely to the user
 * @IsNotEmpty - validation decorator
 */
import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
