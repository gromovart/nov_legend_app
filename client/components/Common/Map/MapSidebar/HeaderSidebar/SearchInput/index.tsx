import style from './style.module.scss';

type TSearchInputProps = {
  title: string;
  onChangeSearch: (value: string) => void;
  clearSearch: () => void;
  value: string;
};

const SearchInput: React.FC<TSearchInputProps> = ({
  title,
  onChangeSearch,
  clearSearch,
  value,
}) => {
  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    // onChangeSearch(evt.currentTarget.value);
  };
  const buttonClickHandler = () => {
    // clearSearch();
  };
  return (
    <>
      <div className={`${style.inputbox}`}>
        <>
          <input
            id="search"
            className={`${style.inputbox__input} ${
              value && style['not-empty']
            } ${value && style.customOpacity}`}
            type="text"
            value={value}
            onChange={onChange}
          />
          <label htmlFor="search" className={`${style.textarea__label}`}>
            {title}
          </label>
          {value && (
            <button
              type="button"
              className={style['close-button']}
              onClick={buttonClickHandler}
            >
              <svg className={`${style.icon} ${style[`icon-cross`]} `}>
                <use xlinkHref="/sprite.svg#cross" />
              </svg>
            </button>
          )}
        </>
      </div>
    </>
  );
};

export default SearchInput;
