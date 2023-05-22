import { Injectable } from '@nestjs/common';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { ItemPedidoEntity } from './itemPedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}
  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId }); //sem essa busca, não há como estabelecer o relacionamento
    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    // let valorTotal = 0;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade;

      // valorTotal += itemPedidoEntity.precoVenda * itemPedido.quantidade

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, itemPedido) => {
      return total + itemPedido.precoVenda * itemPedido.quantidade;
    }, 0);

    pedidoEntity.valorTotal = valorTotal;
    pedidoEntity.itensPedido = itensPedidoEntidades;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }
}
