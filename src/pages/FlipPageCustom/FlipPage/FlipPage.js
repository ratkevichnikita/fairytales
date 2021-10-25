import React from "react";

const FlipPage = React.forwardRef((props, ref) => {

  return (
    <div className="flip-page" ref={ref}>
      <p>{props.text}</p>
      <p>Page number:</p>
    </div>
  );
});

export default FlipPage