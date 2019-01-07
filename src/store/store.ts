//Contain Subscrbers to Store
//Manage State

export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };


  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.subscribers = [];
    this.state = this.reduce(initialState, {});
  }

  //Typescript Get Property
  get value(){
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn)
    }
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  //Anytime this.notify loop through subscriber list and pass new state
  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action){
    const newState = {};
    //iterating over each keyin todo
    //Create new object with prop todo for every key in reducer
    for(const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
