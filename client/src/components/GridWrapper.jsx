import React from "react";
import { Link } from "react-router-dom";
import Animation from "./Animation";

const GridWrapper = props => {
  const { arr, purpose } = props;

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-12 col-sm-12 min-100 p-5">
          <h1 className="text-center ">{purpose.toUpperCase() + "S"}</h1>
          <div className="container mt-5 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center">
              {arr ? (
                arr.map(item => {
                  return (
                    <div className="col-sm-6 col-md-3 col-xs-6 border border-dark p-3 rounded text-center m-2">
                      <Link className="" to={`/${purpose}/${item}`}>
                        {item}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <Animation />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridWrapper;
