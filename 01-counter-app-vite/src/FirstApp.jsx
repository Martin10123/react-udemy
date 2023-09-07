import PropTypes from "prop-types";

const FirstApp = ({ title, subTitle, name }) => {
  return (
    <>
      <h1 data-testid= "test-title">{title}</h1>
      <p>{subTitle}</p>
      <p>{subTitle}</p>
      <p>{name}</p>
    </>
  );
};

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

FirstApp.defaultProps = {
  name: "Martin",
  subTitle: "1234",
  // title: ""
}

export default FirstApp;
