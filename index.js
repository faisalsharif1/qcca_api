const express = require('express');
const app = express();

var helmet = require('helmet');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use(helmet());

app.use(cors());

app.use('/', require('./api/accounts'))
app.use('/', require('./api/accountcodes'))
app.use('/', require('./api/areas'))
app.use('/', require('./api/bankaccounts'))
app.use('/', require('./api/banks'))
app.use('/', require('./api/categories'))
app.use('/', require('./api/chequehistory'))
app.use('/', require('./api/chequelog'))
app.use('/', require('./api/chequestatuses'))
app.use('/', require('./api/companies'))
app.use('/', require('./api/companieskantalog'))
app.use('/', require('./api/company_mine'))
app.use('/', require('./api/companyminediggingdetails'))
app.use('/', require('./api/companypertoncharges'))
app.use('/', require('./api/configurations'))
app.use('/', require('./api/customertypes'))
app.use('/', require('./api/employeeattendences'))
app.use('/', require('./api/employees'))
app.use('/', require('./api/employeetypes'))
app.use('/', require('./api/forminprojects'))
app.use('/', require('./api/heads'))
app.use('/', require('./api/items'))
app.use('/', require('./api/itemtypes'))
app.use('/', require('./api/kantacharge'))
app.use('/', require('./api/kantageneral'))
app.use('/', require('./api/kanta_general_additionalpackages'))
app.use('/', require('./api/mine'))
app.use('/', require('./api/minepertoncharges'))
app.use('/', require('./api/minestatuses'))
app.use('/', require('./api/mobilenos'))
app.use('/', require('./api/partykantalogadditionalchargesdetail'))
app.use('/', require('./api/projects'))
app.use('/', require('./api/purchasedetails'))
app.use('/', require('./api/purchases'))
app.use('/', require('./api/serials'))
app.use('/', require('./api/serialtransactions'))
app.use('/', require('./api/stockassignmentdetails'))
app.use('/', require('./api/stockassignments'))
app.use('/', require('./api/stock'))
app.use('/', require('./api/transactions'))
app.use('/', require('./api/transactionhistories'))
app.use('/', require('./api/transactiontypes'))
app.use('/', require('./api/units'))
app.use('/', require('./api/unittypes'))
app.use('/', require('./api/uploadedimages'))
app.use('/', require('./api/userpermissions'))
app.use('/', require('./api/users'))
app.use('/', require('./api/vehicletypes'))
app.use('/', require('./api/test'))
app.use('/', require('./api/deletedata'))
app.use('/', require('./api/approvepost'))
app.use('/', require('./api/approvedentries'))
app.use('/', require('./api/markapproval'))

var port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})