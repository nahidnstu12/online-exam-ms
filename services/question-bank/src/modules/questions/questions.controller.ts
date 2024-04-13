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
import { CreateQuestionDto } from './create-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionService) {}
  @Get()
  async getAll(@Res() response) {
    const results = await this.questionService.findAll();
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
  async create(@Res() response, @Body() data: CreateQuestionDto) {
    try {
      const qb = await this.questionService.create(data);
      return response.status(201).json({
        type: 'success',
        message: 'Question has been created successfully',
        data: qb,
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
    const result = await this.questionService.findById(id);
    return response.status(200).json({
      type: 'success',
      data: result,
    });
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateqbDto: CreateQuestionDto,
  ) {
    try {
      const user = await this.questionService.update(id, updateqbDto);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Question has been updated successfully',
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
      await this.questionService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Question has been deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }
}
