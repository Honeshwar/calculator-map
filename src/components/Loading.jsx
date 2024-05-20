/**
 * Loading Animation Status
 * @component
 * @returns {JSX.Element} Loading-Spinner
 */
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" style={{ fontSize: "6px" }} />
    </div>
  );
};

export default Loading;
