import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class JogadoresService {
  
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criar-atualizar jogador ${criarJogadorDto}`)
    this.criar(criarJogadorDto)
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, celular, email } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome: nome,
      email: email,
      celular: celular,
      posicao: 10,
      ranking: "A",
      urlfoto: ""
    }

    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      this.jogadores.push(jogador);
    }

  }

  private atualizar(jogadorUpdate: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome, celular, email } = criarJogadorDto;
    jogadorUpdate.nome = nome;
  }
  
  private deletarJogador(email: string): void {
    const jogadorEncontrado = this.jogadores.find(joga => joga.email === email);

    if (!jogadorEncontrado) {
      throw new NotFoundException("Jogador não encontrado");
    }
    this.jogadores = this.jogadores.filter(joga => joga.email !== jogadorEncontrado.email);
  }

  async getJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async getJogadoresByEmail(email): Promise<Jogador> {
    const jogador = this.jogadores.find(joga => joga.email === email);
    return jogador;
  }

  async removerJogador(email: string): Promise<void> {
    this.deletarJogador(email);
  }
}
