import { JogadoresService, IResponse } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { IJogador } from './interfaces/IJogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogadores(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<IResponse> {
    return await this.jogadoresService.criarAtualizarJogadores(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<IJogador[] | IJogador> {
    return email
      ? await this.jogadoresService.consultarJogadorPeloEmail(email)
      : await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<IResponse> {
    if (email) {
      return await this.jogadoresService.deletarJogador(email);
    }
    throw new NotFoundException(`O email do jogador não foi informado.`);
  }
}
