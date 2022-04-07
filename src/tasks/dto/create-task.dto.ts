// Define the DTO as a TS class (using the naming convention for DTO classes in NestJS)
// This DTO helps, because if I want to modify the params, I cand change them here,
// and not go through all the files and modify them.

export class CreateTaskDto {
  title: string;
  description: string;
}