/**
 *  TCIQ WorkList Manager
 * 
 * This code manages to toggle between viewing the full board,
 * + including however many active behavioral health transfers are on the board,
 * + and hiding the active waitlisted behavioral health transfer requests, 
 * + which makes it easier to focus on the medical active transfers.
 * 
 */

 console.clear()

 const omnitool = {
     currentDisplayStatus: 'full',
     bhRows: [],
     allRows: [],
     nonBHRows: [],
     init: function() {
         this.bhRows = this.get_bh_rows()
         this.allRows = this.get_all_rows()
         this.nonBHRows = this.get_non_bh_rows()
     },
     get_bh_rows: function(){
         const ssc_identifier = 'div.text-ellipsis[title="SSC"]',
               dcmc_mhu_identifier = 'div[title="DC-2S-MHU"]',
               bhRowArr = [];
         for (identifier of [ssc_identifier, dcmc_mhu_identifier]){
             document.querySelectorAll(identifier)
                 .forEach(cell => bhRowArr.push(cell.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement));
         }
         return bhRowArr
     },
     get_all_rows: function(){
         return document.querySelectorAll('.react-grid-Canvas')[0].children[1].children;
     },
     get_non_bh_rows: function(){
         const allRows = this.get_all_rows(),
               bhRows = this.get_bh_rows(),
               nonBHRows = [];
         for (row of allRows) {
             if (!bhRows.includes(row)) nonBHRows.push(row)
         }
         return nonBHRows
     },
     bhCaseCount: function() {
         return this.bhRows.length
     },
     allCaseCount: function() {
         return this.allRows.length
     },
     nonBHCaseCount: function() {
         return this.nonBHRows.length
     },
     init: function() {
         this.bhRows = this.getBehavioralHealthRows()
         this.allRows = this.getAllRows()
         this.nonBHRows = this.getNonBHRows()
     },
     hideBHRows: function(){
         // hide behavioral health rows
         this.bhRows.forEach(el => el.style.display = "none");
         this.currentDisplayStatus = 'bhHidden'
         return `now hiding ${this.bhCaseCount()} behavioral health cases`
     },
     showBHRows: function(){
         // show behavioral health rows
         this.bhRows.forEach(el => el.style.display = "inherit");
         this.currentDisplayStatus = 'full'
         return `now displaying ${this.bhCaseCount()} behavioral health cases`
     },
     printCountReport: function() {
         let output = '';
         output += `TOTAL ROWS:                       ${this.allCaseCount()}`
         output += `\nTOTAL BEHAVIORAL HEALTH ROWS:     ${this.bhCaseCount()}`
         output += `\nTOTAL NON-BEHAVIORAL HEALTH ROWS: ${this.nonBHCaseCount()}`
         output += `\ncurrent display status: ${omnitool.currentDisplayStatus}`
         console.log(output);
         //return output
     }
 }
 
 function toggleBehavioralHealthRows() {
     if (omnitool.bhRows.length === 0) omnitool.init()
     let output = "> "
     switch (omnitool.currentDisplayStatus) {
         case 'full':
             output += omnitool.hideBHRows()
             break
         case 'bhHidden':
             output += omnitool.showBHRows()
             break
         default:
             break
     }
     omnitool.printCountReport()
     console.log(output)
 }
 
 
 toggleBehavioralHealthRows()