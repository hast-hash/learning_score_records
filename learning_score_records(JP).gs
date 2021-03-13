function learning_score_records() {
  //get active spreadsheet data
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  const ss = sheet.getDataRange().getValues();

  const r_last = sheet.getLastRow(); // last row 
  const r_data = 4; // data starting row
  const cr_learner_name = "B1"; // learner name cell
  const c_sum = 15; // sum column
  const c_month = 3; // month starting column 
  const c_n_of_data = 12; // number of data size

  //number of data 

  var numbers_of_data = 0;
    for (let j = r_last - 2; j > 0; j--) {
      if ( ss[j][2] !== '' && ss[j][2] !== undefined) {
        var numbers_of_data = j - r_data + 1;
        break;
      } 
    }

  //get personal data from the sheet
  const learner_name = sheet.getRange(cr_learner_name).getValue();
  var total_pts = sheet.getRange(r_last, c_sum + 1).getValue();
  var date = new Date();
  var this_month = date.getMonth();
  var this_month_table = this_month+1;
  if (this_month_table == 1) {
    this_month_table = 13
  }
  var this_month_pts = sheet.getRange(r_last, c_month -1 + this_month_table).getValue();
  const chart_title = 'learning score records: '+learner_name+'   Total: '+total_pts+'   This Month: '+this_month_pts;  

  var range = sheet.getRange(r_data, c_month, numbers_of_data + 1, c_n_of_data);
  const colors = ["maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "black", "silver", "gray"];
  var chart=sheet.newChart()
    .addRange(range)
    .asBarChart()
    .setStacked()
    .setPosition(3,2,0,0)
    .setOption('title',chart_title)
    .setOption('legend', {position: 'top', textStyle: {color: 'GRAY', fontSize: 9}})
    .setOption('chartArea',{width:'120%'})
    .setColors(colors)
    .setNumHeaders(1)
    .build();
  sheet.insertChart(chart);


  

}
