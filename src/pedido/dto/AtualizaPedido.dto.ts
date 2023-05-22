import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './CriaPedido.dto';

export class AtualizaPedidoDTO extends PartialType(CriaPedidoDTO) {}
