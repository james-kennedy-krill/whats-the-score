type Legend = {
  [k: string]: { 
    pred: number;
    func: (a: number, b:number) => number;
    assoc: string;
  }
}

export const findResult = (expression: string): number => {
  const digits = '0123456789.';
  const operators = ['+', '-', '*', '/', 'negate'];
  const legend: Legend = {
     '+': { pred: 2, func: (a, b) => { return a + b; }, assoc: "left" },
     '-': { pred: 2, func: (a, b) => { return a - b; }, assoc: "left" },
     '*': { pred: 3, func: (a, b) => { return a * b; }, assoc: "left" },
     '/': { pred: 3, func: (a, b) => {
       if (b != 0) { return a / b; } else { return 0; }
      }, assoc: "left" },
      'negate': { pred: 4, func: (a) => { return -1 * a; }, assoc: "right" }
  };
  let exp:string = expression.replace(/\s/g, '');
  let operations = [];
  let outputQueue = [];
  let ind:number = 0;
  let str = '';
  while (ind < exp.length) {
    let ch:string = exp[ind];
    if (operators.includes(ch)) {
      if (str !== '') {
          outputQueue.push(new Number(str));
          str = '';
      }
      if (ch === '-') {
          if (ind == 0) {
            ch = 'negate';
          } else {
            let nextCh = exp[ind+1];
            let prevCh = exp[ind-1];
            if ((digits.includes(nextCh) || nextCh === '(' || nextCh === '-') &&
                (operators.includes(prevCh) || exp[ind-1] === '(')) {
                  ch = 'negate';
            }
          }
      }
      if (operations.length > 0) {
          let topOper = operations[operations.length - 1];
          while (operations.length > 0 && legend[topOper] &&
          ((legend[ch].assoc === 'left' && legend[ch].pred <= legend[topOper].pred) ||
          (legend[ch].assoc === 'right' && legend[ch].pred < legend[topOper].pred))) {
            outputQueue.push(operations.pop());
            topOper = operations[operations.length - 1];
          }
      }
      operations.push(ch);
    } else if (digits.includes(ch)) {
      str += ch
    } else if (ch === '(') {
      operations.push(ch);
    } else if (ch === ')') {
      if (str !== '') {
          outputQueue.push(new Number(str));
          str = '';
      }
      while (operations.length > 0 && operations[operations.length - 1] !== '(') {
          outputQueue.push(operations.pop());
      }
      if (operations.length > 0) { operations.pop(); }
    }
    ind++;
  }
  if (str !== '') { outputQueue.push(new Number(str)); }
    outputQueue = outputQueue.concat(operations.reverse())
    let res: number[] = [];
    while (outputQueue.length > 0) {
      let ch = outputQueue.shift() as string;
      if (operators.includes(ch)) {
          if (ch === 'negate' ) {
            let [num1=0] = [res.pop()];
            res.push(legend[ch].func(num1,0));
          } else {
            let [num2=0, num1=0] = [res.pop(), res.pop()];
            res.push(legend[ch].func(num1, num2));
          }
      } else {
          res.push(parseFloat(ch));
      }
    }
    const final = res.pop();
    if (final) {
      return final.valueOf();
    }
    return 0;
};
