import { useParams } from "react-router-dom";
import "../assests/SocialMedia.css";
import { useState } from "react";
import PostCaption from "../components/PostCaption";

const SocialMedia = () => {
  const { socialMedia } = useParams();
  const [subject, setSubject] = useState("");
  const [selectTone, setSelectTone] = useState("professional");
  const [postCaptions, setPostCaptions] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const tones = [
    "Friendly",
    "Bold",
    "Witty",
    "Professional",
    "Casual",
    "Formal",
    "Inspirational",
    "Persuasive",
    "Humorous",
    "Serious",
    "Informative",
    "Conversational",
    "Enthusiastic",
    "Sympathetic",
    "Optimistic",
    "Encouraging",
    "Sincere",
    "Authoritative",
    "Playful",
    "Sarcastic",
  ];

  const requestGeneratePostCaptions = async (e) => {
    e.preventDefault();
    const url = "/GeneratePostCaptions";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socialMedia, subject, selectTone }),
    };
    if (subject) {
      try {
        const response = await fetch(url, option);

        const data = await response.json();
        const postCaptions = data.postCaptions;
        const postCaptionsArray = postCaptions.split(";;");
        setPostCaptions(postCaptionsArray);
        setIsGenerated(!isGenerated);
        setSubject("");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="container social-media">
        <h2 className="social-media__title">{socialMedia} Post</h2>
        <form
          action="submit"
          className="form__social-media"
          onSubmit={requestGeneratePostCaptions}
        >
          <label htmlFor="caption-topic">
            What topic do you want a caption for?
          </label>
          <input
            type="text"
            name="caption-topic"
            id="caption-topic"
            className="form__input"
            placeholder="SmC AI is about to launch"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <label htmlFor="caption-topic">
            What should your caption sould like?
          </label>
          <select
            id="caption-tone"
            name="caption-tone"
            className="form__input"
            defaultValue={selectTone}
            onChange={(e) => setSelectTone(e.target.value)}
          >
            {tones?.map((tone) => {
              return <option value={tone.toLowerCase()}>{tone}</option>;
            })}
          </select>
          <button className="btn--primary-color btn__generate">
            Generate caption
          </button>
        </form>
        {isGenerated && (
          <h3 className="social-media__subtitle">Captions generated for you</h3>
        )}
        {isGenerated &&
          postCaptions?.map((postCaption, index) => {
            return (
              <PostCaption
                caption={postCaption}
                firstButton="Share"
                secondButton="Save"
              />
            );
          })}
      </div>
    </>
  );
};

export default SocialMedia;
