/**
 *  TCIQ WorkList Manager
 * 
 * This code manages to toggle between viewing the full board,
 * + including however many active behavioral health transfers are on the board,
 * + and hiding the active waitlisted behavioral health transfer requests, 
 * + which makes it easier to focus on the medical active transfers.
 * 
 * author: Kenneth Dait, kpdait@ascension.org
 * 
 */

 console.clear()

 const omnitool = {
     currentDisplayStatus: 'full',
     bhRows: [],
     allRows: [],
     nonBHRows: [],
     getBehavioralHealthRows: function(){
         const ssc_identifier = 'div.text-ellipsis[title="SSC"]',
               dcmc_mhu_identifier = 'div[title="DC-2S-MHU"]',
               bhRowArr = [];
         for (identifier of [ssc_identifier, dcmc_mhu_identifier]){
             document.querySelectorAll(identifier)
                 .forEach(cell => bhRowArr.push(cell.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement));
         }
         return bhRowArr
     },
     getAllRows: function(){
         return document.querySelectorAll('.react-grid-Canvas')[0].children[1].children;
     },
     getNonBHRows: function(){
         const allRows = this.getAllRows(),
               bhRows = this.getBehavioralHealthRows(),
               nonBHRows = [];
         for (row of allRows) {
             if (!bhRows.includes(row)) nonBHRows.push(row)
         }
         return nonBHRows
     },
     getBehavioralHealthCaseCount: function() {
         return this.bhRows.length
     },
     getAllRowsCount: function() {
         return this.allRows.length
     },
     getNonBHRowsCount: function() {
         return this.nonBHRows.length
     },
     init: function() {
         this.bhRows = this.getBehavioralHealthRows()
         this.allRows = this.getAllRows()
         this.nonBHRows = this.getNonBHRows()
     },
     hideBehavioralHealthRows: function(){
         // hide behavioral health rows
         this.bhRows.forEach(el => el.style.display = "none");
         this.currentDisplayStatus = 'bhHidden'
         return `now hiding ${this.getBehavioralHealthCaseCount()} behavioral health cases`
     },
     showBehavioralHealthRows: function(){
         // show behavioral health rows
         this.bhRows.forEach(el => el.style.display = "inherit");
         this.currentDisplayStatus = 'full'
         return `now displaying ${this.getBehavioralHealthCaseCount()} behavioral health cases`
     },
     printCountReport: function() {
         let output = '';
         output += `TOTAL ROWS:                       ${this.getAllRowsCount()}`
         output += `\nTOTAL BEHAVIORAL HEALTH ROWS:     ${this.getBehavioralHealthCaseCount()}`
         output += `\nTOTAL NON-BEHAVIORAL HEALTH ROWS: ${this.getNonBHRowsCount()}`
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
             output += omnitool.hideBehavioralHealthRows()
             break
         case 'bhHidden':
             output += omnitool.showBehavioralHealthRows()
             break
         default:
             break
     }
     omnitool.printCountReport()
     console.log(output)
 }
 
 
 toggleBehavioralHealthRows()