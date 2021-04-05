import { JogadoresService, IResponse } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';

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
  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }
}
