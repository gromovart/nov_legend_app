import style from '../../style.module.scss';
import SearchInput from './SearchInput';

type THeaderSidebarProps = {
  goBack: () => void;
  onChangeSearch: (value: string) => void;
  clearSearch: () => void;
  value: string;
};

const HeaderSidebar: React.FC<THeaderSidebarProps> = ({
  goBack,
  onChangeSearch,
  clearSearch,
  value,
}) => {
  // const count = useSelector(getMarkersCount);
  // const searchCount = useSelector(getSearchCount);
  return (
    <div className={style['sidebar-header']}>
      <div className={style.header_title}>
        <h4>
          {`Достопримечательности `}
          <span>{1}</span>
        </h4>
        <button className={style.header_button} type="button">
          <svg className={`${style.icon} ${style['icon-attention']}`}>
            <use href="/sprite.svg#arrow-left" />
          </svg>
        </button>
      </div>
      <SearchInput
        title="Найти легенду"
        onChangeSearch={onChangeSearch}
        clearSearch={clearSearch}
        value={value}
      />
    </div>
  );
};

export default HeaderSidebar;
