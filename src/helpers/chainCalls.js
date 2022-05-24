export function switchTabsThenFilterThenSelectMarks(workbook, activeSheet, tableau) {
    workbook.activateSheetAsync("GDP per capita by region")
      .then(function (newSheet) {
        activeSheet = newSheet;
  
        // It's important to return the promise so the next link in the chain
        // won't be called until the filter completes.
        return activeSheet.applyRangeFilterAsync(
          "Date (year)",
          {
            min: new Date(Date.UTC(2002, 1, 1)),
            max: new Date(Date.UTC(2008, 12, 31))
          },
          tableau.FilterUpdateType.REPLACE);
      })
      .then(function (filterFieldName) {
        return activeSheet.selectMarksAsync(
          "AGG(GDP per capita (weighted))",
          {
            min: 20000
          },
          tableau.SelectionUpdateType.REPLACE);
      });
  }      