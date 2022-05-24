export function querySheets(workbook, getSheetsAlertText) {
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

export function queryDashboard(workbook, getDashboardAlertText) {
  workbook.activateSheetAsync("GDP per Capita Dashboard")
    .then(function (dashboard) {
      var worksheets = dashboard.getWorksheets();
      // console.log("!!! worksheets",worksheets);
      var text = getDashboardAlertText(worksheets);
      text = "Worksheets in the dashboard:\n" + text;
      alert(text);
    });
} 

export function changeDashboardSize(workbook, tableau) {
  workbook.activateSheetAsync("GDP per Capita Dashboard")
    .then(function (dashboard) {
      dashboard.changeSizeAsync({
        behavior: tableau.SheetSizeBehavior.AUTOMATIC
      });
    });
}