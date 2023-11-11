import React from "react";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [offset, setOffset] = React.useState(210);
  const { getAllCharacters } = useMarvelService();
  const [newItemLoading, setNewItemLoading] = React.useState(true);
  React.useEffect(() => {
    onCharList();
  }, []);
  const onCharList = (offset) => {
    setNewItemLoading(true);
    getAllCharacters(offset)
      .then((res) => {
        onChar(res);
      })
      .catch((error) => {
        onError();
      });
  };
  const onChar = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setOffset((offset) => offset + 9);
    setError(false);
    setLoading(false);
    setNewItemLoading((newItemLoading) => false);
  };
  const onError = () => {
    setError(true);
    setLoading(false);
  };
  const itemsRefs = React.useRef([]);
  const focusOnItem = (id) => {
    itemsRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemsRefs.current[id].classList.add("char__item_selected");
    itemsRefs.current[id].focus();
  };
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          ref={(el) => (itemsRefs.current[i] = el)}
          onClick={() => {
            onCharSelected(item.id);
            focusOnItem(i);
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        onClick={() => onCharList(offset)}
        disabled={newItemLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
