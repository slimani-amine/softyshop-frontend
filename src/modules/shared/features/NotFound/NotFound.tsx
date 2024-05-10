import { useNavigate } from "react-router-dom";

const NotFound = ({ props }: any) => {
  const navigate = useNavigate();
  const backToPrevious = () => {
    navigate(-1);
  };
  return (
    <div className="par">
      <div className="wrapper">
        <div className="wrapper_inside">
          {props === "404" ? (
            <div>
              <h1>404 Error</h1>
              <h2>Page not found</h2>
            </div>
          ) : (
            <div>
              <h1>401 Error</h1>
              <h2>Unauthorized</h2>
            </div>
          )}
          <p>
            Whatever you are trying <br /> to look for is not here...
          </p>
          <a onClick={backToPrevious}>&#8592; Back to my programs</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
