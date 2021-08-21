import { MigrationInterface, QueryRunner } from 'typeorm';
import { jsonToArrayCustom } from '../../utils/helpers';
import MapCategory from '../entities/MapCategory';

export class addMapCategories1629565838223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { data } = await jsonToArrayCustom('database/dumps/categories.json');
    await queryRunner.manager.save(MapCategory, data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
