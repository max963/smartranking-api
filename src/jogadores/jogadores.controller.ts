import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);

  }

  @Get()
  async getJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.getJogadores();
  }
  
  @Get("/email")
  async getJogadoresByEmail(@Query('email') email: string): Promise<Jogador> {
    return await this.jogadoresService.getJogadoresByEmail(email);
  }

  @Delete()
  async removerJogador(@Query('email') email: string): Promise<void> {
    return await this.jogadoresService.removerJogador(email);
  }
}
