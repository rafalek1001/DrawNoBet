import {pool} from '../utils/db';
import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import {FieldPacket} from 'mysql2';

type DisciplineRecordResults = [DisciplineRecord[], FieldPacket[]];

export class DisciplineRecord {
  public id?: string;
  public name: string;
  public index: number;

  constructor(obj: DisciplineRecord) {
    const {id, name, index} = obj;

    if (!name || name.length < 3 || name.length > 50) {
      throw new ValidationError('Nazwa dyscypliny musi mieć od 3 do 50 znaków.');
    }

    this.id = id ?? uuid();
    this.name = name;
    this.index = index;
  }

  static async getOne(id: string): Promise<DisciplineRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `disciplines` WHERE `id` = :id", {
      id,
    }) as DisciplineRecordResults;

    return results.length === 0 ? null : new DisciplineRecord(results[0]);
  }

  static async listAll(): Promise<DisciplineRecord[]> {
    const [results] = await pool.execute("SELECT * FROM `disciplines` ORDER BY `index` ASC") as DisciplineRecordResults;

    return results.map(obj => new DisciplineRecord(obj));
  }
}