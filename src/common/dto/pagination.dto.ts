import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDTO {

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number; //Se le pone signo de interrogación para indicar que es opcional

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;
}