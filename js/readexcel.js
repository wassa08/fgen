const excelFile=document.getElementById('excel-file');
const viewPDF= document.getElementById('viewPDF');
const print=document.getElementById('print');
var listeFactures=new Array();

  excelFile.addEventListener('change',(event)=>{
    var reader =new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload=function(event){
      var data=new Uint8Array(reader.result);
      var workBook=XLSX.read(data,{type:'array'});
      var sheetName=workBook.SheetNames;
      var sheetData=XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]],{header:1});
      if(sheetData.length>0){
        console.log('ok');
        var tableOutput='<table class="articles">';
        for(var row=0;row<sheetData.length;row++){
          tableOutput+='<tr class="row">';
            for(var cell=0;cell < sheetData[row].length;cell++){
              tableOutput+='<td class="cell">'+sheetData[row][cell]+'</td>';
            }
          tableOutput+='</tr>';
        }
        tableOutput+='</table>';
        document.getElementById('excel-data').innerHTML=tableOutput;
      }
      const xrows=document.getElementsByClassName('row');
      for(var i=0; i<xrows.length;i++){
        const xrow=xrows[i].childNodes;
        const facture={
          nfact:xrow[0].textContent,
          date: xrow[1].textContent,
          codeClient:xrow[2].textContent,
          nameClient:xrow[3].textContent,
          htva:xrow[4].textContent,
          txtva:xrow[5].textContent,
          tva:xrow[6].textContent,
          dt:xrow[7].textContent,
          ttc:xrow[8].textContent,
          qte:xrow[9].textContent,
          mf:xrow[10].textContent,
          adresse:xrow[11].textContent,
        };
        listeFactures.push(facture);
      }
    }
  });
  viewPDF.addEventListener('click',(event)=>{
    var debut=1;
    var fin=50;
    sessionStorage.setItem("debut",debut);
    sessionStorage.setItem("fin",fin);
    sessionStorage.setItem("listeFactures", JSON.stringify(listeFactures));
    window.location.href = 'Viewpdf.html'
  });