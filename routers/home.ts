import { BetRecord } from './../records/bet.record';
import {Router} from "express";
import * as moment from 'moment';

export const homeRouter = Router();

homeRouter

  .get('/', async (req, res) => {
    const lastBetsList = await BetRecord.getLastThreeEdited();
    lastBetsList.map(bet => bet.datetime = moment(bet.datetime).format("DD-MM-YYYY"));

    res.render('home/home', {
      lastBetsList,
    });
  });