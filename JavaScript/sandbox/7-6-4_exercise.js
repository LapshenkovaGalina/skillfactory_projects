const ticTacToeBoard = [];
const ticTacToeBoardSize = 3;

for (let i = 0; i < ticTacToeBoardSize; i++)
{
    const ticTacToeBoardRow = [];

    for (let j = 0; j < ticTacToeBoardSize; j++)
    {
        ticTacToeBoardRow.push(Math.random() < 0.5 ? 'x' : 'o');
    }
            
    ticTacToeBoard.push(ticTacToeBoardRow);
    console.log(ticTacToeBoard[i].join('  '));
}