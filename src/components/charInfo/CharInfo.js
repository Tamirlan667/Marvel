import "./charInfo.scss";
import React from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
const CharInfo = ({ charId }) => {
  const [char, setChar] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [skelet, setSkelet] = React.useState(true);
  const { getCharacter } = useMarvelService();
  React.useEffect(() => {
    updateChar();
  }, [charId]);
  const updateChar = () => {
    setSkelet(true);
    if (!charId) {
      return;
    }
    getCharacter(charId)
      .then((res) => {
        onCharLoaded(res);
      })
      .catch((error) => {
        onError();
      });
  };
  const onCharLoaded = (char) => {
    setChar(char);
    setSkelet(false);
  };
  const onError = () => {
    setError(true);
    setSkelet(false);
  };
  const skeleton = skelet ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(skelet || error || !char) ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {errorMessage}
      {skeleton}
      {content}
    </div>
  );
};
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
