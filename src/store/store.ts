//Contain Subscrbers to Store
//Manage State

export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };

  private state: { [key: string]: any };


  constructor(reducers = {}, initialState = {}) {
    this.state = initialState;
    this.reducers = reducers;
  }

  //Typescript Get Property
  get value(){
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action)
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
