import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokermonDto {
    //entero, positivo, min=1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    //string, minlength = 1
    @IsString()
    @MinLength(1)
    name:string;

}
