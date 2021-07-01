import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey = "ffdd61b43af50b74bcedb7e14679930c2e956eca572e1d8b807a3e2338fdd0dc/stage"

function App() {
  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles) 
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <h1>Voice Powered News Reader</h1>
    </div>
  );
}

export default App;
