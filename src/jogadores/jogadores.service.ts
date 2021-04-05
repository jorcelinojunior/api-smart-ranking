import { IJogador } from './interfaces/IJogador.interface';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface IResponse {
  ok: boolean;
}

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = [];

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

  public async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadores;
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<IResponse> {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: IJogador = {
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
    jogadorEncontrado: IJogador,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IResponse> {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;

    return { ok: true };
  }

  public async consultarJogadorPeloEmail(email: string): Promise<IJogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`);
    }
    return jogadorEncontrado;
  }

  public async deletarJogador(email: string): Promise<IResponse> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com email ${email} não encontrado para ser deletado.`,
      );
    }

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== email,
    );

    return { ok: true };
  }
}
