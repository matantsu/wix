import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { Main } from './views';
import { search } from './effects'
import { } from "redux";
import { State, previousAction, nextAction, store } from "./store";

const state2Props =
  (state: State) => state
const dispatch2Props = 
  (dispatch: (action: any) => any) => 
    ({
      search: (term: string) => dispatch(search(term)),
      prev: () => dispatch(previousAction()),
      next: () => dispatch(nextAction())
    })

const App = 
  connect(
    state2Props,
    dispatch2Props
    )(Main)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById("app")
);
