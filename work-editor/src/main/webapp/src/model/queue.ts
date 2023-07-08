
export function Queue<T>()
{
  const array = [] as T[];

  const push = (item: T) => 
  {
    array.push(item);
  };

  const pop = () =>
  {
    array.shift();
  };

  const front = () =>
  {
    return array[0];
  };

  const length = () => array.length;

  const isEmpty = () => length() == 0;


  return { push, pop, front, length, isEmpty };
}
