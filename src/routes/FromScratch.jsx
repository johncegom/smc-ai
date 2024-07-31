import "../assests/FromScratch.css";
import Service from "../components/Service";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const FromScratch = () => {
  return (
    <>
      <div className="container">
        <h2 className="from-scratch__title">Generate captions from scratch</h2>
        <p className="from-scratch__description">
          Choose the type of post you want a caption for, and let SmC AI write
          it for you.
        </p>
        <p className="from-scratch__description">
          What kind of post do you want a caption for?
        </p>
        <section className="flex flex--col service__list">
          <Service
            title={"Facebook post"}
            description={"Generate caption for a post on Facebook."}
            path="facebook"
            Icon={FacebookIcon}
          />
          <Service
            title={"Instagram post"}
            description={"Generate caption for a post on Instagram."}
            path="instagram"
            Icon={InstagramIcon}
          />
          <Service
            title={"X (Twitter) post"}
            description={"Generate caption for a post on X (Twitter)."}
            path="x"
            Icon={XIcon}
          />
        </section>
      </div>
    </>
  );
};

export default FromScratch;
