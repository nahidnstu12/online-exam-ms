import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdParamValidation } from 'src/utils/decorator/idparam.validator';
import { QuestionSetService } from '../question-set/question-set.service';
import { CreateExamDto } from './create-exam.dto';
import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(
    private examService: ExamService,
    private quesSetService: QuestionSetService,
  ) {}
  @Get()
  async getAll(@Res() response) {
    const results = await this.examService.findAll();
    return response.status(200).json({
      type: 'success',
      data: results,
      meta: {
        totalItems: results.length,
      },
    });
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async create(@Res() response, @Body() data: CreateExamDto) {
    try {
      const qset = await this.quesSetService.findById(data.questionsetId);
      const res = await this.examService.create(data, qset);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'Exam has been created successfully',
        data: res,
      });
    } catch (error) {
      return response.status(500).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param() { id }: IdParamValidation) {
    const result = await this.examService.findById(id);
    return response.status(200).json({
      type: 'success',
      data: result,
    });
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateqbDto: CreateExamDto,
  ) {
    try {
      const user = await this.examService.update(id, updateqbDto);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Exam has been updated successfully',
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }

  @Delete('/:id')
  public async delete(@Res() response, @Param() { id }: IdParamValidation) {
    try {
      await this.examService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Exam has been deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }
}
