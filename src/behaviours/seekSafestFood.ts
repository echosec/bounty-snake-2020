import { ISnake, IBoard, ICoordinate, Directions, Matrix } from '../Types';
import Pathfinder from '../Pathfinder';
import { firstToFood } from '../helpers';
import { chaseEnemyTail } from './chaseEnemyTail';

/**
 * @param {Pathfinder} PF - Pathfinder class initialized with game state
 * @param {IBoard} board - the board state
 * @param {ISnake} us - our snake
 * @returns {Directions} returns the next direction
 */
export const seekSafestFood = (
  PF: Pathfinder,
  board: IBoard,
  us: ISnake
): Directions => {
  try {
    const snakes: ISnake[] = board.snakes;
    const head: ICoordinate = us.body[0];
    const PF = new Pathfinder(board, snakes);
    const { food: foodArray } = board;

    let pathToSafestFood: Matrix;
    let safestFood: ICoordinate;
    // For each food item we check:
    // 1. Are we closer than any other snake.
    // 2. After we eat the food do we have a path to another snakes tail (escape route)
    // If so, we chonk.
    foodArray.forEach(snakeSnack => {
      const winnerWinnerChickenDinner = firstToFood(us, snakes, snakeSnack, PF);
      const pathToSnack = PF.getFullPath(head, snakeSnack);
      const futureBody = [];
      // map where our body will be when we eat food.
      for (const coordinate of pathToSnack) {
        let futureBodyPoint = {};
        futureBodyPoint['x'] = coordinate[0];
        futureBodyPoint['y'] = coordinate[0];
        futureBody.push(futureBodyPoint);
      }
      const futureUs = { ...us, body: futureBody };
      // Make sure we have somewhere to go after eating. We will check if there is a snake tail to chase.
      const postNibleOption = checkPostNibleOption(PF, snakes, futureUs);
      if (
        winnerWinnerChickenDinner &&
        postNibleOption &&
        (!pathToSafestFood || pathToSnack < pathToSafestFood)
      ) {
        pathToSafestFood = pathToSnack;
        safestFood = snakeSnack;
      }
    });
    if (safestFood) {
      return PF.getStep(head, safestFood);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {Pathfinder} - PF - our pathfinder class.
 * @param {ISnake[]} sankes - dastardly foes.
 * @param {ISnake} futureUs - will i be pretty, will i be rich?
 * to check where our body will be should we dine.
 * @returns {Directions} returns the next direction
 */
function checkPostNibleOption(
  PF: Pathfinder,
  snakes: ISnake[],
  futureUs: ISnake
) {
  return chaseEnemyTail(PF, snakes, futureUs) ? true : false;
}

export default seekSafestFood;
