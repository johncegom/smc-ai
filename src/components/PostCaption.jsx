import "../assests/PostCaption.css";

const PostCaption = ({ caption, firstButton, secondButton }) => {
  return (
    <>
      <section className="post-caption flex flex--col">
        <p className="post-caption__content">{caption}</p>
        <section className="post-caption__button-group flex flex--col">
          <button
            className={
              "btn--primary-color post-caption__button btn-" +
              firstButton.toLowerCase()
            }
          >
            {firstButton}
          </button>
          <button
            className={
              "btn--secondary-color post-caption__button btn-" +
              secondButton.toLowerCase()
            }
          >
            {secondButton}
          </button>
        </section>
      </section>
    </>
  );
};

export default PostCaption;
