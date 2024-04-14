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
import { OptionService } from './option.service';
import { CreateOptionDto } from './create-option.dto';
import { QuestionService } from '../questions/question.service';

@Controller('options')
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
  ) {}
  @Get()
  async getAll(@Res() response) {
    const results = await this.optionService.findAll();
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
  async create(@Res() response, @Body() data: CreateOptionDto) {
    try {
      const question = await this.questionService.findById(data.questionId);
      const res = await this.optionService.create(data, question);
      return response.status(201).json({
        type: 'success',
        message: 'Option has been created successfully',
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
    const result = await this.optionService.findById(id);
    return response.status(200).json({
      type: 'success',
      data: result,
    });
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateDto: CreateOptionDto,
  ) {
    try {
      const user = await this.optionService.update(id, updateDto);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Option has been updated successfully',
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
      await this.optionService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Option has been deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }
}
