import { Injectable, NotFoundException } from '@nestjs/common';
import { ITasks, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITasks[] = [];

  getAllTasks(): ITasks[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: FilterTaskDto) {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((ele) => ele.status === status);
    }

    if (search) {
      tasks = tasks.filter((ele) => {
        if (ele.title.includes(search) || ele.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): ITasks {
    const found = this.tasks.find((ele) => ele.id === id);
    if (!found) {
      throw new NotFoundException(`Task not found with id ${id}!`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): ITasks {
    const { title, description } = createTaskDto;
    const task: ITasks = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((ele) => ele.id !== found.id);
  }
}
