//select html element
const addMatch = document.querySelector(".lws-addMatch");
const allMatches = document.querySelector(".all-matches");
const empty = document.querySelector(".lws-reset");

//create action type
const INCREMENT = "score/increment";
const DECREMENT = "score/decrement";
const ADDCOUTNER = "score/counter";
const RESET = "score/reset";
// initialsta create
const initialStates = [
  {
    id: 0,
    value: 0,
  },
];

//create reducer create

const scoreReducer = (states = initialStates, action) => {
  switch (action.type) {
    case ADDCOUTNER:
      return [...states, { ...action.payload, id: states.length }];

    case INCREMENT:
      return states.map((state) => {
        if (state.id === action.payload.id) {
          return { ...state, value: state.value + action.payload.value };
        } else {
          return state;
        }
      });

    case DECREMENT:
      return states.map((state) => {
        if (state.id === action.payload.id) {
          let decre = state.value - action.payload.value;
          if (decre >= 0) {
            return { ...state, value: decre };
          } else {
            return { ...state, value: 0 };
          }
        } else {
          return state;
        }
      });

    case RESET:
      return states.map((state) => {
        return { ...state, value: 0 };
      });
    default:
      return states;
  }
};

//create action
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id,
      value,
    },
  };
};
const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id,
      value,
    },
  };
};
const addCounter = (id) => {
  return {
    type: ADDCOUTNER,
    payload: {
      id,
      value: 0,
    },
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// create store
const store = Redux.createStore(scoreReducer);

function incrementForm(el, id) {
  const icrementValue = el.querySelector(".lws-increment").value;
  store.dispatch(increment(id, Number(icrementValue)));
}

function decrementForm(el, id) {
  const decrementValue = el.querySelector(".lws-decrement").value;
  store.dispatch(decrement(id, Number(decrementValue)));
}
const render = () => {
  const states = store.getState();

  allMatches.innerHTML = states
    .map((el) => {
      return `<div class="match">
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${el.id + 1}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm" onsubmit="event.preventDefault();incrementForm(this,${
        el.id
      })">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
      </form>
      <form class="decrementForm" onsubmit="event.preventDefault();decrementForm(this,${
        el.id
      })">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">${el.value}</h2>
    </div>
  </div>`;
    })
    .join("");
};

render();
store.subscribe(render);

// Add New Match
addMatch.addEventListener("click", () => {
  store.dispatch(addCounter());
});

// Reset Button
empty.addEventListener("click", () => {
  store.dispatch(reset());
});
