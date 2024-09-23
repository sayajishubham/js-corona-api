let mainSection = document.querySelector("tbody");

function myFunction() {
  fetch("http://localhost:3000/data")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      let regionalData = data.regional;
      let summaryData = data.summary;
      let unofficialSummary=data["unofficial-summary"];
      console.log(unofficialSummary);
      console.log(regionalData);
      console.log(summaryData);
      display(regionalData, summaryData,unofficialSummary);
    })
    .catch((err) => {
      console.log(err);
    });
}

myFunction();

function display(regionalData, summaryData,unofficialSummary) {
  regionalData.map((data) => {
    let shows = show(data.loc, data.confirmedCasesIndian, data.confirmedCasesForeign, data.discharged, data.deaths, data.totalConfirmed);
    mainSection.innerHTML += shows;
  });

  mainSection.innerHTML += `
    <tr>
      <th scope="row" colspan="7">Summary</th>
    </tr>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td>Total CasesIndia: ${summaryData.confirmedCasesIndian}</td>
      <td>Total CasesForeign: ${summaryData.confirmedCasesForeign}</td>
      <td>Total discharged: ${summaryData.discharged}</td>
      <td>Total Death: ${summaryData.deaths}</td>
      <td>Total Confirmed: ${summaryData.total}</td>
    </tr>
  `;
 
    mainSection.innerHTML += `
      <tr>
        <th scope="row" colspan="7">unofficial-Summary</th>
      </tr>
      <tr>
        <th scope="row"></th>
        <td></td>
        <td>Total CasesIndia: ${unofficialSummary[0].source}</td>
        <td>Total recovered: ${unofficialSummary[0].recovered}</td>
        <td>Total discharged: ${unofficialSummary[0].active}</td>
        <td>Total Death: ${unofficialSummary[0].deaths}</td>
        <td>Total Confirmed: ${unofficialSummary[0].total}</td>
      </tr>
    `;
  
 
}

function show(state, CasesIndia, CaseSForeing, discharged, deaths, totalConfirmed) {
  let store = `
    <tr>
      <th scope="row"></th>
      <td>${state}</td>
      <td>${CasesIndia}</td>
      <td>${CaseSForeing}</td>
      <td>${discharged}</td>
      <td>${deaths}</td>
      <td>${totalConfirmed}</td>
    </tr>
  `;
  return store;
}