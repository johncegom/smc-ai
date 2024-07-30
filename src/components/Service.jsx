import { Link } from "react-router-dom";
import "../assests/Service.css";

const Service = ({ title, description, path, Icon }) => {
  return (
    <Link to={path} className="service flex">
      {Icon && <Icon className="service__thumbnail" />}
      <section>
        <h4 className="service__title">{title}</h4>
        <p className="service__description">{description}</p>
      </section>
    </Link>
  );
};

export default Service;
