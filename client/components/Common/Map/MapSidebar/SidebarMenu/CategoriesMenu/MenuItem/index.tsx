import style from '../../../../style.module.scss';

interface IMenuItem {
  title: string;
  clickHandler: any;
  id: number;
}

const MenuItem: React.FC<IMenuItem> = ({ title, clickHandler, id }) => {
  return (
    <div
      role="presentation"
      className={style['menu-item']}
      onClick={clickHandler({ title, id })}
    >
      <span>{title}</span>
    </div>
  );
};

export default MenuItem;
