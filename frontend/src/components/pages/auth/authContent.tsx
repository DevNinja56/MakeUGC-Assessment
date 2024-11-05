import Logo from "../../common/logo";

const AuthContent = () => {
  return (
    <div
      className={`py-28 xl:pl-36 hidden lg:flex flex-col gap-6 2xl:gap-12 w-6/12 relative pr-20`}
    >
      <Logo />
      <img
        className="mix-blend-luminosity 2xl:h-8/12 2xl:w-8/12"
        alt="mainImage"
        src="/images/AuthMainImage.svg"
      />
      <div className="flex flex-col text-white gap-1 2xl:gap-3">
        <h1 className="text-3xl 2xl:text-4xl font-extrabold">
          Unlock Your Creativity!
        </h1>
        <p className="text-sm 2xl:text-lg leading-normal opacity-80">
          Sign up today to gain access to our powerful AI-driven content idea
          generator. Whether you're a blogger, marketer, or content creator, our
          tool helps you discover fresh, innovative ideas tailored to your
          niche. Enjoy personalized suggestions, save your favorites, and
          unleash your creativity. Join us now and take the first step towards
          transforming your content strategy!
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
