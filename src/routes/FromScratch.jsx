import { useState } from "react";
import "../assests/FromScratch.css";
import Service from "../components/Service";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const FromScratch = () => {
  const [socialNetwork, setSocialNetwork] = useState("Twitter");
  const [subject, setSubject] = useState("Skipli is launching SkipliAI");
  const [tone, setTone] = useState("Friendly");
  const [postCaptions, setPostCaptions] = useState([]);
  const [renderContent, setRenderContent] = useState("");

  const requestGeneratePostCaptions = async () => {
    const url = "/GeneratePostCaptions";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socialNetwork, subject, tone }),
    };
    try {
      const response = await fetch(url, option);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      const postCaptions = data.postCaptions;
      const postCaptionsArray = postCaptions.split(";;");
      setPostCaptions(postCaptionsArray);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <main>
        <div className="container">
          <h1>Generate captions from scratch</h1>
          <p>
            Choose the type of post you want a caption for, and let SmC AI write
            it for you.
          </p>
          <p>What kind of post do you want a caption for?</p>
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
      </main>
    </>
  );
  // return (
  //   <>
  //     <main>
  //       <div className="container">
  //         <button
  //           className="btn--primary-color btn__generate"
  //           onClick={requestGeneratePostCaptions}
  //         >
  //           Click to generateeeeeeeee
  //         </button>
  //         <div>
  //           {postCaptions?.map((caption) => {
  //             return <p className="from-scratch__caption">{caption}</p>;
  //           })}
  //         </div>
  //       </div>
  //     </main>
  //   </>
  // );
};

export default FromScratch;
