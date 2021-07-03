import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards"
import wordsToNumber from "words-to-numbers";

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
          const parseNumber = number.length > 2 ? wordsToNumber(number, { fuzzy: true }) : number
          const article = articles[parseNumber - 1]
          if (parseNumber > 20) {
            alanBtn().playText("please try that again")
          } else if (article) {
            window.open(article.url, "_blank")
            alanBtn().playText("Opening...")
          }
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
