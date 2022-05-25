import React, { useEffect, useRef } from "react";
import {
  addValuesToFilter,
  clearFilters,
  filterRangeOfValues,
  filterSingleValue,
  removeValuesFromFilter,
} from "../../helpers/filters";
import { selectSingleValue } from "../../helpers/selectData";
import { switchSheet } from "../../helpers/switchSheet";
import { switchTabsThenFilterThenSelectMarks } from "../../helpers/chainCalls"
import { querySheets } from "../../helpers/query"
import { queryDashboard } from "../../helpers/query"
import {CocaCola} from "../../constants/url"
// import { exportPDF } from "../../helpers/toolbar"

const { tableau } = window;
console.log("WINDOW: ", tableau);
function FiltersApi(props) {
  const ref = useRef(null);

  let workbook, activeSheet;

  const initViz = () => {
    console.log("CocaCola",CocaCola);
    let myUrl = "https://supplier-portal.buraq.bazaar-data.com/views/CocaCola/Trends2?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
    
    // let myUrl = "https://supplier-portal.buraq.bazaar-data.com/#/workbooks/37?:origin=card_share_link";
    // let myUrl = "https://supplier-portal.buraq.bazaar-data.com/views/CocaCola/Map_1?:origin=card_share_link&:embed=n";
    // var myUrl = "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
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
    // querySheets(workbook, getSheetsAlertText)
    var viz = new tableau.Viz(ref.current, myUrl, options);
    console.log({workbook})

    viz.showExportPDFDialog();

    // viz.dispose();

    // return viz;
  };

  const querySheets = (workbook, getSheetsAlertText) => {
    console.log()
    var sheets = workbook.getPublishedSheetsInfo();
    // console.log("sheets",sheets);
    // var newArr = sheets.map(function(element, index, array){
    //   console.log("element",element.$0.name);
    //   return element.$0.name + "\n";
    // });
    var text = getSheetsAlertText(sheets);
    text = "Sheets in the workbook:\n" + text;
    alert(text);
  }    

  const exportPDF = () => {
    // var tableauVizToolbar = tableauViz();
    // console.log("!!! tableauViz", tableauVizToolbar);
    // console.log("tableau.viz",tableau.viz);
    // viz.dispose();
    var myUrl = "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
    // var options = {
    //   width: ref.offsetWidth,
    //   height: ref.offsetHeight,
    //   hideTabs: true,
    //   hideToolbar: true,
    //   onFirstInteractive: function () {
    //     workbook = viz.getWorkbook();
    //     activeSheet = workbook.getActiveSheet();
    //   },
    // };
    // viz.dispose();
    // var viz = new tableau.Viz(ref.current, myUrl, options);
    var viz2 = new tableau.Viz(ref.current, myUrl);
    viz2.showExportPDFDialog();
  }    

  const renderMapsSheet = () => {
    switchSheet(workbook);
  };

  const getSheetsAlertText = (sheets) => {
    var newArr = sheets.map(function(element, index){
      return "  Sheet "+index+" (worksheet) - "+ element.$0.name;
    });
    return newArr.join("\n");
  }

  const getDashboardAlertText = (dashboards) => {
    var newArr = dashboards.map(function(element, index){
      return "  Sheet "+index+" (worksheet) - "+ element._impl.$5;
    });
    return newArr.join("\n");
  }

  useEffect(initViz, []);

  return (
    <div>
      <h1>{"Filters API"}</h1>
      <div style={setVizStyle} ref={ref} />

      <button
        onClick={() =>
          filterSingleValue(tableau, activeSheet, "Region", "Europe")
        }
      >
        Show Europe Only (Update Filter)
      </button>

      <button
        onClick={() =>
          addValuesToFilter(tableau, activeSheet, "Region", [
            "Europe",
            "Middle East",
          ])
        }
      >
        Add Europe and Middle East (Add values to filter)
      </button>

      <button
        onClick={() =>
          removeValuesFromFilter(tableau, activeSheet, "Region", "Europe")
        }
      >
        Remove Europe from Filter (Remove value from filter)
      </button>
      <br />

      <button
        onClick={() =>
          filterRangeOfValues(
            tableau,
            activeSheet,
            "F: GDP per capita (curr $)",
            { min: 40000, max: 60000 }
          )
        }
      >
        Show countries having min: $40k and max $60k GDP (Apply range of
        filters)
      </button>

      <button onClick={() => selectSingleValue(tableau, workbook)}>
        Highlight Asia (Select single value)
      </button>

      <button
        onClick={() =>
          clearFilters(activeSheet, ["Region", "F: GDP per capita (curr $)"])
        }
      >
        Clear Filters
      </button>

      <button onClick={renderMapsSheet}>Show Map Sheet</button>

      <button onClick={() => switchTabsThenFilterThenSelectMarks(workbook, activeSheet, tableau)}>
        Chaining calls (Apply range filter then select marks)
      </button>

      <button onClick={() => querySheets(workbook, getSheetsAlertText)}>
        Querying sheets
      </button>

      <button onClick={() => queryDashboard(workbook, getDashboardAlertText)}>
        Querying Dashboard
      </button>

      <button onClick={exportPDF}>
        Download PDF
      </button>
    </div>
  );
}

const setVizStyle = {
  // width: "800px",
  // height: "700px",
};

export default FiltersApi;
