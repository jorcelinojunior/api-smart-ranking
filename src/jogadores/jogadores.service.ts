import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface IResponse {
  ok: boolean;
}

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogadores(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IResponse> {
    this.logger.log(`criarJogadorDto: ${criarJogadorDto}`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return await this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      return await this.criar(criarJogadorDto);
    }
  }

  public async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<IResponse> {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'url_foto',
    };

    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);

    return { ok: true };
  }

  private async atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IResponse> {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;

    return { ok: true };
  }
}
