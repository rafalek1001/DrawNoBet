import { BetRecord } from './../records/bet.record';
import { DisciplineRecord } from './../records/discipline.record';
import {Router} from "express";
import * as moment from 'moment';

export const betRouter = Router();

betRouter

  .get('/', async (req, res) => {
    const betsList = await BetRecord.listAllEdited();
    betsList.map(bet => bet.datetime = moment(bet.datetime).format("DD-MM-YYYY HH:mm"));
    
    res.render('bet/list', {
      betsList,
    });
  })

  .post('/', async (req, res) => {
    const {odd} = req.body;

    const newBet = new BetRecord({
      ...req.body,
      odd: Number(odd).toPrecision(3),
    });

    await newBet.insert();
    
    res.redirect('/bet');
  })

  .put('/:id', async (req, res) => {
    const editedBet = new BetRecord({
      ...req.body,
    });

    const id = req.params.id;
    const {event} = req.body;

    await editedBet.update(id);

    res.set({'Refresh': '3; url=/bet'});

    res.render('bet/edited', {
      id,
      event,
    });
  })

  .delete('/:id', async (req, res) => {
    const id = req.params.id;
    const {event} = await BetRecord.getOne(id);
    
    await BetRecord.delete(id);

    res.set({'Refresh': '3; url=/bet'});

    res.render('bet/deleted', {
      id,
      event,
    });
  })

  .get('/add-form', async (req, res) => {
    const disciplinesList = await DisciplineRecord.listAll();

    res.render('bet/add-form', {
      disciplinesList,
    })
  })
  
  .get('/form/edit/:id', async (req, res) => {
    const bet = await BetRecord.getOne(req.params.id);
    bet.datetime = moment(bet.datetime).format("YYYY-MM-DD HH:mm");
    const disciplinesList = await DisciplineRecord.listAll();

    res.render('bet/forms/edit', {
      bet,
      disciplinesList,
    })
  })

  .get('/form/delete/:id', async (req, res) => {
    const id = req.params.id;
    const {event} = await BetRecord.getOne(id);

    res.render('bet/forms/delete', {
      id,
      event,
    });
  });