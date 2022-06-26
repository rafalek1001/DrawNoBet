import {pool} from '../utils/db';
import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import {FieldPacket} from 'mysql2';

type BetRecordResults = [BetRecord[], FieldPacket[]];

export class BetRecord {
  public id?: string;
  public event: string;
  public bet: string;
  public odd: number;
  public bookmaker: string;
  public disciplineId: string;
  public datetime: string;
  public status: number;
  public numberOfAll: number;

  constructor(obj: BetRecord) {
    const {id, event, bet, odd, bookmaker, disciplineId, datetime, status} = obj;

    this.id = id ?? uuid();
    this.event = event;
    this.bet = bet;
    this.odd = odd;
    this.bookmaker = bookmaker;
    this.disciplineId = disciplineId;
    this.datetime = datetime;
    this.status = status ?? 0;
  }

  async insert(): Promise<string> {

    await pool.execute("INSERT INTO `bets`(`id`, `event`, `bet`, `odd`, `bookmaker`, `disciplineId`, `datetime`, `status`) VALUES (:id, :event, :bet, :odd, :bookmaker, :disciplineId, :datetime, :status)", {
      id: this.id,
      event: this.event,
      bet: this.bet,
      odd: this.odd,
      bookmaker: this.bookmaker,
      disciplineId: this.disciplineId,
      datetime: this.datetime,
      status: this.status,
    });

    return this.id;
  }

  async update(id: string): Promise<void> {
    await pool.execute("UPDATE `bets` SET `event` = :event, `bet` = :bet, `odd` = :odd, `bookmaker` = :bookmaker, `disciplineId` = :disciplineId, `datetime` = :datetime, `status` = :status WHERE `id` = :id", {
      id,
      event: this.event,
      bet: this.bet,
      odd: this.odd,
      bookmaker: this.bookmaker,
      disciplineId: this.disciplineId,
      datetime: this.datetime,
      status: this.status,
    });
  }

  static async delete(id: string): Promise<void> {
    await pool.execute("DELETE FROM `bets` WHERE `id` = :id", {
      id,
    });
  }

  static async getOne(id: string): Promise<BetRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `bets` WHERE `id` = :id", {
      id,
    }) as BetRecordResults;

    return results.length === 0 ? null : new BetRecord(results[0]);
  }

  static async getOneEdited(id: string): Promise<BetRecord | null> {
    const [results] = await pool.execute("SELECT `bets`.`id`, `bets`.`event`, `bets`.`bet`, `bets`.`odd`, `bets`.`bookmaker`, `disciplines`.`name` AS `discipline`, `disciplines`.`image` AS `image`, `bets`.`datetime`, `bets`.`status` FROM `bets` INNER JOIN `disciplines` ON `bets`.`disciplineId` = `disciplines`.`id` WHERE `bets`.`id` = :id", {
      id,
    }) as BetRecordResults;

    return results.length === 0 ? null : results[0];
  }

  static async getLastThreeEdited(): Promise<BetRecord[]> {
    const [results] = await pool.execute("SELECT `bets`.`id`, `bets`.`event`, `bets`.`bet`, `bets`.`odd`, `bets`.`bookmaker`, `disciplines`.`name` AS `discipline`, `disciplines`.`image` AS `image`, `bets`.`datetime`, `bets`.`status` FROM `bets` INNER JOIN `disciplines` ON `bets`.`disciplineId` = `disciplines`.`id` ORDER BY `datetime` DESC LIMIT 3") as BetRecordResults;

    return results;
  }

  static async listAll(): Promise<BetRecord[]> {
    const [results] = await pool.execute("SELECT * FROM `bets`") as BetRecordResults;

    return results.map(obj => new BetRecord(obj));
  }

  static async listAllEdited(): Promise<BetRecord[]> {
    const [results] = await pool.execute("SELECT `bets`.`id`, `bets`.`event`, `bets`.`bet`, `bets`.`odd`, `bets`.`bookmaker`, `disciplines`.`name` AS `discipline`, `disciplines`.`image` AS `image`, `bets`.`datetime`, `bets`.`status` FROM `bets` INNER JOIN `disciplines` ON `bets`.`disciplineId` = `disciplines`.`id`") as BetRecordResults;

    return results;
  }

  static async countAllBets(): Promise<number> {
    const [results] = await pool.execute("SELECT `id` FROM `bets`") as BetRecordResults;

    return results.length;
  }

  static async countBets(status: number): Promise<number> {
    const [results] = await pool.execute("SELECT `id` FROM `bets` WHERE `status` = :status", {
      status,
    }) as BetRecordResults;

    return results.length;
  }
}