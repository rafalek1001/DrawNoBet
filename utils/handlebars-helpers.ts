export const handlebarsHelpers = {
  precision: (num: number) => num.toPrecision(3),
  equals: (a: any, b: any) => a === b,
  checkStatus: (status: number) => {
    if (status === 0) {
      return 'bet-container-waiting';
    } else if (status === 1) {
      return 'bet-container-positive';
    } else if (status === 2) {
      return 'bet-container-negative';
    } else if (status === 3) {
      return 'bet-container-return';
    }
  },
};