import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards"
import useStyles from "./styles"

const alanKey = "ffdd61b43af50b74bcedb7e14679930c2e956eca572e1d8b807a3e2338fdd0dc/stage"

function App() {
  const classes = useStyles()

  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if (command === "open") {
          console.log(number)
          window.open(articles[number].url, "_blank")
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src="https://cdn.vox-cdn.com/thumbor/3Ll7UneeKXyM-52mN4IE0YcjvDU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13260223/972039104.jpg.jpg" className={classes.mainLogo} alt="mainLogo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
