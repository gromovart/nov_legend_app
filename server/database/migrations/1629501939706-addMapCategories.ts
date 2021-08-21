import { MigrationInterface, QueryRunner } from 'typeorm';
import { jsonToArrayCustom } from '../../utils/helpers';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class addMapCategories1629501939706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { data } = await jsonToArrayCustom('database/dumps/data.json');
    const categories = data.map((_: any) => ({
      title: _.district,
      innerName: _.district,
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('map_category', ['title', 'innerName'])
      .values(categories)
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
