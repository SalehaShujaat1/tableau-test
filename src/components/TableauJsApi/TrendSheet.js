import React, { useEffect, useRef } from "react";
import { switchSheet } from "../../helpers/switchSheet";
import {CocaCola} from "../../constants/url"

const { tableau } = window;
console.log("WINDOW: ", tableau);
function FiltersApi(props) {
  const ref = useRef(null);

  let workbook, activeSheet;

  const initViz = () => {
    console.log("CocaCola",CocaCola);
    var options = {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      hideTabs: true,
      hideToolbar: true,
      onFirstInteractive: function () {
        workbook = viz.getWorkbook();
        activeSheet = workbook.getActiveSheet();
      },
    };
    var viz = new tableau.Viz(ref.current, CocaCola[0], options);
  };

  useEffect(initViz, []);

  return (
    <>
      <h1>{"Trend API"}</h1>
      <div style={setVizStyle} ref={ref} />
    </>
  );
}

const setVizStyle = {
  // width: "800px",
  // height: "700px",
};

export default FiltersApi;
