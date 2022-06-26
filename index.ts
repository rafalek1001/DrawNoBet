import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express";
import {engine} from "express-handlebars";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {homeRouter} from "./routers/home";
import {statsRouter} from './routers/stats';
import {betRouter} from './routers/bet';
import {handleError} from "./utils/errors";
import './utils/db';


const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
  extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/bet', betRouter);
app.use('/stats', statsRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});