import React from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharInfo from "../components/charInfo/CharInfo";
import CharList from "../components/charList/CharList";
import decoration from "../resources/img/vision.png";
const Main = () => {
  const [selectedChar, setChar] = React.useState(null);
  const onCharSelected = (id) => {
    setChar(id);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default Main;
