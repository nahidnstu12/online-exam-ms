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
import { QuestionBankService } from '../question-bank/bank.service';
import { CreateQuestionSetDto } from './create-question-set.dto';
import { QuestionSetService } from './question-set.service';

@Controller('question-sets')
export class QuestionSetController {
  constructor(
    private questionSetService: QuestionSetService,
    private bankService: QuestionBankService,
  ) {}
  @Get()
  async getAll(@Res() response) {
    const results = await this.questionSetService.findAll();
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
  async create(@Res() response, @Body() data: CreateQuestionSetDto) {
    try {
      const bank = await this.bankService.findById(data.questionBankId);
      const res = await this.questionSetService.create(data, bank);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'QuestionSet has been created successfully',
        data: res,
      });
    } catch (error) {
      return response.status(500).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param() { id }: IdParamValidation) {
    const result = await this.questionSetService.findById(id);
    return response.status(200).json({
      type: 'success',
      data: result,
    });
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateqbDto: CreateQuestionSetDto,
  ) {
    try {
      const user = await this.questionSetService.update(id, updateqbDto);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'QuestionSet has been updated successfully',
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
      await this.questionSetService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'QuestionSet has been deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }
}
