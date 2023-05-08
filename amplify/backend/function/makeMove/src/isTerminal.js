const isEmpty = state => {
  return state.every(cell => cell === null);
};

const isFull = state => {
  return state.every(cell => cell);
};

const isTerminal = state => {
  if (isEmpty(state)) return false;
  const winningLines = [
    // HORIZONTAL
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // VERTICAL
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //DIAGONAL
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const line = winningLines[i];
    const [cell1, cell2, cell3] = line;
    if (state[cell1] && state[cell1] === state[cell2] && state[cell1] === state[cell3]) {
      const result = {
        winner: state[cell1]
      };
      if (i < 3) {
        result.direction = 'H';
        result.row = i === 0 ? 1 : i === 1 ? 2 : 3;
      }
      if (i >= 3 && i < 6) {
        result.direction = 'V';
        result.column = i === 3 ? 1 : i === 4 ? 2 : 3;
      }
      if (i > 5) {
        result.direction = 'D';
        result.diagonal = i === 6 ? 'MAIN' : 'COUNTER';
      }

      return result;
    }
  }

  if (isFull(state)) {
    return {
      winner: null
    };
  }

  return false;
};

module.exports = isTerminal;
