import React, { useEffect, useState } from "react";
import FiltersApi from "./FiltersApi";
import TrendSheet from "./TrendSheet";

function MainAPI(props) {
  const [visibleSheets, setVisibleSheets] = useState([]);

  const renderFiltersSheet = () => {
    console.log("!!! visibleSheets",visibleSheets);
    setVisibleSheets([...visibleSheets, <FiltersApi />]);
  };

  const renderTrendSheet = () => {
    console.log("!!! visibleSheets",visibleSheets);
    setVisibleSheets([...visibleSheets, <TrendSheet />]);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        {visibleSheets.map((sheet, index) => (
          <div key={index}>
            {sheet}
            <br />
            <br />
          </div>
        ))}
      </div>
      {/* <button onClick={renderFiltersSheet}>Show Filters Example</button> */}
      <button onClick={renderTrendSheet}>Show Trend Sheet Example</button>
    </div>
  );
}

export default MainAPI;
