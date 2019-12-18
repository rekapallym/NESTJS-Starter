import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFiltered } from './dto/getTasksFilter-dto';
import { TaskStatusValidationPipe } from './pipes/taskStatus-validation-pipe';

@Controller('tasks')
export class TasksController {
    constructor( private tasksService: TasksService ) {}

    @Get()
    getTasks( @Query(ValidationPipe) filterdto: GetTasksFiltered): Task[] {
        if (Object.keys(filterdto).length) {
            return this.tasksService.getTasksByFilter(filterdto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByid( @Param('id') id: string ) {
        return this.tasksService.getTaskById(id);
    }


    // @Body() body use this to get the whole response in one object
    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
        // console.log("title", title);
        // console.log("title", description);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe ) status: TaskStatus,
    ) {
         return this.tasksService.updateTask(id, status);
    }
}
