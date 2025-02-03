import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const imageArray = [{
    id: 1,
    src: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    isFlipped: false,
    isMatched: false
  }, {
    id: 2,
    src: "https://imgcdn.stablediffusionweb.com/2024/5/8/a98bf90f-6935-43e8-b6e7-d76d16f72081.jpg",
    isFlipped: false,
    isMatched: false
  }, {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2015/09/04/19/32/landscape-922581_640.png",
    isFlipped: false,
    isMatched: false
  }, {
    id: 4,
    src: "https://static.vecteezy.com/system/resources/previews/021/629/700/non_2x/soccer-ball-football-cartoon-icon-illustration-sports-icon-concept-illustration-suitable-for-icon-logo-sticker-clipart-free-vector.jpg",
    isFlipped: false,
    isMatched: false
  }, {
    id: 5,
    src: "https://static.vecteezy.com/system/resources/previews/008/974/656/non_2x/cute-kid-girl-holding-bubble-milk-tea-hand-drawn-cartoon-character-illustration-vector.jpg",
    isFlipped: false,
    isMatched: false
  }]

  const shuffledImages = [...imageArray, ...imageArray]
    .map((img, index) => ({ ...img, id: index + 1 }))
    .sort(() => Math.random() - 0.5)

  const [cards, setCards] = useState(shuffledImages)
  const [flippedCards, setFlippedCards] = useState([])

  const flipCard = (id) => {
    if (flippedCards.length === 2) return; // Prevent flipping more than 2 cards at once

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );

    setFlippedCards((prev) => [...prev, id]); // Track flipped cards
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard?.src === secondCard?.src) {
        // Cards match 
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        // Cards don't match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([])
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.every(img => img.isMatched)) {
      setTimeout(() => {
        alert("Congratulations! You've matched all the cards!");
        resetGame()
      }, 3000);
    }
  }, [cards])

  const resetGame = () => {
    const shuffledCards = [...imageArray, ...imageArray]
      .map((img, index) => ({ ...img, id: index + 1 }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffledCards.map(card => ({ ...card, isFlipped: false, isMatched: false })));
  }

  return (
    <>
      <div className="text-center p-3">
        <h1> Memory game : FlipQuest </h1>
      </div>

      <div className="container text-center board">
        <div className="row py-3 justify-content-center">
          <div className="col-md-auto">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div className='p-2' style={{ display: "flex", gap: "10px" }}>
                {cards.slice(0, 3).map((card) => (
                  <div
                    key={card.id}
                    className='imgCard'
                    style={{
                      height: "100px",
                      width: "100px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: card.isFlipped ? "transparent" : "gold",
                    }}
                    onClick={() => flipCard(card.id)}
                  >
                    {
                      card.isFlipped
                        ?
                        <img className='imgCard' src={card.src} height={100} width={100} />
                        :
                        <span style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>?</span>
                    }
                  </div>
                ))}
              </div>

              <div className='p-2' style={{ display: "flex", gap: "10px" }}>
                {cards.slice(3, 7).map((card) => (
                  <div
                    key={card.id}
                    className='imgCard'
                    style={{
                      height: "100px",
                      width: "100px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: card.isFlipped ? "transparent" : "gold",
                    }}
                    onClick={() => flipCard(card.id)}
                  >
                    {
                      card.isFlipped
                        ?
                        <img className='imgCard' src={card.src} height={100} width={100} />
                        :
                        <span style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>?</span>
                    }
                  </div>
                ))}
              </div>

              <div className='p-2' style={{ display: "flex", gap: "10px" }}>
                {cards.slice(7, 10).map((card) => (
                  <div
                    key={card.id}
                    className='imgCard'
                    style={{
                      height: "100px",
                      width: "100px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: card.isFlipped ? "transparent" : "gold",
                    }}
                    onClick={() => flipCard(card.id)}
                  >
                    {
                      card.isFlipped
                        ?
                        <img className='imgCard' src={card.src} height={100} width={100} />
                        :
                        <span style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>?</span>
                    }
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
