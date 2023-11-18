import React from "react";
import "./Home.scss";
import { createStore } from "../../redux/createStore";
import { rootReducer } from "../../redux/rootReducer";

const store = createStore(rootReducer, 0)


const HeandlerCounter = () => {
    store.dispatch({type: 'INC'});
   
     
}

export const Home = () => {
  return (
    <div className="home">
        
      <h1 className="home-heading">Our team is the key to your</h1>
      <h2 className="home-heading-word">SUCCESS</h2>
      <button type="button" className="home-btn">
        MEET US
      </button>
      <button onClick={HeandlerCounter}>Counter</button>
    </div>
   
  );
};

export default Home;
