import { MigrationInterface, QueryRunner } from 'typeorm';

export class relacionaItemPedidoEProduto1684776097252
  implements MigrationInterface
{
  name = 'relacionaItemPedidoEProduto1684776097252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item_pedido" ADD "produtoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "item_pedido" ADD CONSTRAINT "FK_099311cd18493b5ef895627ec99" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_pedido" DROP CONSTRAINT "FK_099311cd18493b5ef895627ec99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_pedido" DROP COLUMN "produtoId"`,
    );
  }
}
