import { BetRecord } from '../records/bet.record';
import {Router} from "express";

export const statsRouter = Router();

statsRouter

  .get('/', async (req, res) => {
    const numberOfAll = await BetRecord.countAllBets();
    const numberOfWaitings = await BetRecord.countBets(0);
    const numberOfPositives = await BetRecord.countBets(1);
    const numberOfNegatives = await BetRecord.countBets(2);
    const numberOfReturned = await BetRecord.countBets(3);
    const numberOfSettled = numberOfPositives + numberOfNegatives;
    const percent = `${(numberOfPositives * 100 / numberOfSettled).toFixed(2)}%`;

    res.render('stats/list', {
      numberOfAll,
      numberOfWaitings,
      numberOfPositives,
      numberOfNegatives,
      numberOfReturned,
      numberOfSettled,
      percent,
    });
  });