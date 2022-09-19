import React from "react";

const Card =(props)=>{
  return(
      <div>
          <div className="card" style={{width:"18rem"}}>
              <img src="..." className="card-img-top" alt="..."/>
              <div className="card-body">
                  <h5 className="card-title">{props.cardTitle}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk
                      of the card's content.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      </div>
  );
};

export default Card;