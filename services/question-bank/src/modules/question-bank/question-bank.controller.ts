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
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { QuestionBankService } from './question-bank.service';

@Controller('question-bank')
export class QuestionBankController {
  constructor(private questionBankService: QuestionBankService) {}
  @Get()
  async getAll(@Res() response) {
    const results = await this.questionBankService.findAll();
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
  async create(@Res() response, @Body() data: CreateQuestionBankDto) {
    try {
      const qb = await this.questionBankService.create(data);
      return response.status(201).json({
        type: 'success',
        message: 'Question Bank has been created successfully',
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
    const result = await this.questionBankService.findById(id);
    return response.status(200).json({
      type: 'success',
      data: result,
    });
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateqbDto: CreateQuestionBankDto,
  ) {
    try {
      const user = await this.questionBankService.update(id, updateqbDto);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Question Bank has been updated successfully',
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
      await this.questionBankService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Question Bank has been deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: 'error',
        message: 'Something went wrong, Please try again later',
      });
    }
  }
}
