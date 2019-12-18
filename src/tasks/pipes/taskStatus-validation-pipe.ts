import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowStatusses =[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value:any){
        value = value.toUpperCase();

        if(!this.isTaskValid(value) ){
            throw new BadRequestException(`${value} is a invalid one!`)
        }

        return value;

    }

    private isTaskValid(status:any){
       const idx =  this.allowStatusses.indexOf(status);
       return idx !== -1;
        }

}