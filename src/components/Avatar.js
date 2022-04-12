// styles
import "./Avatar.css";

export default function Avatar({ src }) {
  //src周围添加{}啊，不然thumbanail不会出现！！！！！！！
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
}
