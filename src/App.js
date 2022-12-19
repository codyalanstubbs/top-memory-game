import { useState, useEffect }from 'react';
import uniquid from 'uniquid';
import getEmoji from "get-random-emoji";
import './App.css';


const App = () => {
  
  const getNRandomEmojis = (n) => {
    const emojiArray = []; 
    while (emojiArray.length < n) {
      const newEmoji = getEmoji();
      if (
        !emojiArray.find((item) => (item.emoji === newEmoji))
      ) {
        emojiArray.push(
          {id: uniquid(), emoji: newEmoji, clicked: false, },
        )
      }
    }
    return emojiArray;
  };

  const [roundScore,    setRoundScore]    = useState(0);
  const [currentScore,  setCurrentScore]  = useState(0);
  const [bestScore,     setBestScore]     = useState(0);
  const [emojis,        setEmojis]        = useState(getNRandomEmojis(2));

  const shuffle = (array) => {
    // Kudos: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const onClick = (event) => {
    let emojiItems = [...emojis];
    let clickedEmoji = emojiItems.find((emo) => emo.id === event.target.id);

    // If the clickEmoji has already been clicked...
    if (clickedEmoji.clicked === true ) {
      // Then...

      // ...if currentScore is greater than bestScore...
      if (currentScore > bestScore) {
        // ...then set a new bestScore
        setBestScore(currentScore);
      }

      // ...reset the current score
      setCurrentScore(0);      
      // ...reset the round score
      setRoundScore(0);
      // ...and the emojis
      setEmojis(getNRandomEmojis(2));

    } else { // If the clickEmoji has NOT already been clicked...

      // ...and if the roundScore is going to be equal to 
      // ...the number of emojis...
      if (roundScore === emojis.length-1) {
        // Then...

        // ...reset the round score
        setRoundScore(0);
        // ...reset the emojis have 1 more random emoji
        // ...than is currently in the emojis array
        setEmojis(getNRandomEmojis(emojis.length+1));

      } else { // ...and if the roundScore is NOT going to be equal to 
        // ...the number of emojis...   
        // Then...

        // ...then increment the roundScore by 1
        setRoundScore(roundScore + 1);
        // ...and change the clickEmoji's clicked status to true
        clickedEmoji.clicked = true; 
        // ...and reshuffle the current set of emojis
        setEmojis(shuffle(emojis));

      }

      // ...increase the currentScore
      setCurrentScore(currentScore + 1);

    }
  };
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Emoji Memory Game</h1>
        <h2>Current Score: {currentScore}</h2>
        <h2>Best Score: {bestScore}</h2>
        <ul>
          {
            emojis.map((emo) => {
              return (
                <li 
                  key={emo.id} 
                  id={emo.id}
                  onClick={onClick}
                >
                  {emo.emoji}
                </li>
              );
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
