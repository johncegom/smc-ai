import "../assests/Services.css";
import Service from "../components/Service";

const Services = () => {
  return (
    <>
      <div className="container">
        <h2 className="services__title">
          Generate post ideas and captions in seconds
        </h2>
        <section className="services__list flex flex--col">
          <Service
            title={"Start from scratch"}
            description={"Generate new captions to engage, delight, or sell."}
            path="from-scratch"
          />
          <Service
            title={"Get inspired"}
            description={"Generate post ideas and captions for a topic."}
            path="get-inspired"
          />
        </section>
      </div>
    </>
  );
};

export default Services;
