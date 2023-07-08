

export class Delegate<Args extends readonly unknown[]>
{
  private callbacks: {(...args: Args): void}[] = [];

  public addEventListener = (callback: (...args: Args)=>void) =>
  {
    this.callbacks.push(callback);
  };

  public removeEventListener = (callback: (...args: Args)=>void) =>
  {
    this.callbacks = this.callbacks.filter(item => item != callback);
  };

  public run = (...args: Args) =>
  {
    this.callbacks.forEach(callback => callback(...args));
  };  
}