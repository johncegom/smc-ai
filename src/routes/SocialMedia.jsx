import { useParams } from "react-router-dom";

const SocialMedia = () => {
  const { socialMedia } = useParams();
  return (
    <>
      <main>
        <div className="container">
          <h1>{socialMedia} Post</h1>
        </div>
      </main>
    </>
  );
};

export default SocialMedia;
