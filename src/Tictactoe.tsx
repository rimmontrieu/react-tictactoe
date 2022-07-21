import { useEffect, useRef, useState } from "react"

const Tictactoe = () => {
  
  const [state, setState] = useState<number[]>(Array(9).fill(-1));
  const turn = useRef<number>(1);

  const itemClick = (index:number) => {

    // Only fill empty position
    if (state[index] !== -1) return;
    state[index] = turn.current;
    turn.current = Math.abs(turn.current - 1);
    setState([...state]);
  };

  // Return index position from matrix value
  const mv = (i:number, j:number) => state[i * 3 + j];

  // Check won condition using effect
  useEffect(() => {

    let won = -1;

    // By columns and rows
    for (let j = 0; j < 3; j++) {

       if( mv(0, j) !== -1 )
        if (mv(0, j) == mv(1, j) && mv(1, j) == mv(2, j)) won = mv(0, j);

       if( mv(j, 0) !== -1 )
        if (mv(j, 0) == mv(j, 1) && mv(j, 1) == mv(j, 2)) won = mv(j, 0);
    }

    // By diagonal
    if (mv(0, 0) == mv(1, 1) && mv(1, 1) == mv(2, 2)) won = mv(0, 0);
    if (mv(0, 2) == mv(1, 1) && mv(1, 1) == mv(2, 0)) won = mv(0, 2);
  
    setTimeout(() => {
      if (won !== -1) {
        alert((won == 1) ? 'X won' : 'O won');
        location.reload();
      }
    }, 500);

  }, [state]);

  const renderedState = state.map((it, index) => {
    return (
      <div 
        className='flex items-center justify-center text-3xl border border-gray-100 text-black w-24 h-24 bg-cyan-200 float-left cursor-pointer' 
        onClick={e => itemClick(index)}
        key={index}>
        {it !== -1 && (it == 1 ? 'X' : 'O')}
      </div>
    )
  });

  return (
    <div className="my-4 py-4 w-3/4 mx-auto rounded-lg">
      <div className='w-72 h-72 bg-cyan-200 mx-auto overflow-hidden rounded-lg'>
        {renderedState}
      </div>
    </div>
  )
}

export default Tictactoe
