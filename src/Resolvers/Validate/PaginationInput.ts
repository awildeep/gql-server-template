import { Min} from "class-validator";
import { Field, InputType} from "type-graphql";

@InputType()
export class PaginationInput {
    @Field({nullable: true})
    @Min(0)
    skip?: number;

    @Field({nullable: true})
    @Min(1)
    take?: number;
}