import { FilterOutlined } from '@ant-design/icons';
import { Checkbox, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import { getMarkersData } from '../../../../../../store/MapData/selectors';
import { setFiltredDataAction } from '../../../../../../store/MapData/actions';

type TSearchInputProps = {
  title: string;
  onChangeSearch: (value: string) => void;
  clearSearch: () => void;
  value: string;
};
const categories = [
  { title: 'Легенды', innerName: 'Легенды' },
  { title: 'Предания', innerName: 'Предания' },
  { title: 'Сказки', innerName: 'Сказки' },
  { title: 'Былички', innerName: 'Былички' },
  { title: 'Озёра', innerName: 'Озёра' },
  { title: 'Источники', innerName: 'Источники' },
  { title: 'Камни', innerName: 'Камни' },
  { title: 'Другое', innerName: 'Другое' },
];
const icons = {
  Легенды: '/svg/022-witch.png',
  Предания: '/svg/005-knight.png',
  Сказки: '/svg/018-princess-3.png',
  Былички: '/svg/024-fairy-2.png',
  Озёра: '/svg/021-mermaid.png',
  Источники: '/svg/030-fairy-tale.png',
  Камни: '/svg/031-centaur.png',
  Другое: '/svg/010-king-2.png',
};
const FilterList = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const markersData = useSelector(getMarkersData);
  useEffect(() => {
    const filtredData = markersData?.filter((item) =>
      item.mapCategories.some((el) => filters.includes(el.title))
    );
    dispatch(setFiltredDataAction(filtredData));
  }, [filters]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {categories.map((item) => (
        <Checkbox
          value={item.title}
          onClick={(event) =>
            setFilters((prev) => {
              const { value } = event.target;
              if (prev) {
                return [...prev, value];
              }
              return [value];
            })
          }
        >
          {/* <img */}
          {/*  src={icons[item.title]} */}
          {/*  alt="item.title" */}
          {/*  width={15} */}
          {/*  height={25} */}
          {/* /> */}
          <span>{`  ${item.title}`}</span>
        </Checkbox>
      ))}
    </div>
  );
};
const SearchInput: React.FC<TSearchInputProps> = ({
  title,
  onChangeSearch,
  clearSearch,
  value,
}) => {
  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    onChangeSearch(evt.currentTarget.value);
  };
  const buttonClickHandler = () => {
    // clearSearch();
  };
  return (
    <>
      <div className={`${style.search}`}>
        <>
          <input
            id="search"
            className={`${style.search__input} ${value && style['not-empty']} ${
              value && style.customOpacity
            }`}
            type="text"
            value={value}
            onChange={onChange}
          />
          <Popover content={FilterList} trigger="click" placement="bottom">
            <button
              type="button"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                position: 'absolute',
                top: '15px',
                right: '10px',
                cursor: 'pointer',
              }}
            >
              <FilterOutlined style={{ transform: 'scale(1.5)' }} />
            </button>
          </Popover>
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
