//les declarations globales
var listeFactures=new Array();
let facture={
    nfact:1000,
    date: "01/01/2020",
    codeClient:9999,
    nameClient:"xxxxxx",
    htva:9999,
    txtva:99,
    tva:9999,
    dt:9999,
    ttc:9999,
    qte:9999,
    mf:"ffffff",
    adresse:"adresse clt"
  };
listeFactures = JSON.parse(sessionStorage.getItem('listeFactures'));
var debut=parseInt(sessionStorage.getItem("debut",debut));
var fin=parseInt(sessionStorage.getItem("fin",fin));
//chiffres ==>lettres
let num2Letters=function (number) {
    if (isNaN(number) || number < 0 || 99999 < number) {
        return 'Veuillez entrer un nombre entier compris entre 0 et 999.';
    }

    var units2Letters = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
        tens2Letters = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    
    var units = number % 10,
        tens = (number % 100 - units) / 10,
        hundreds = (number % 1000 - number % 100) / 100;
        thousands = (number % 10000 - number % 1000) / 1000;

    var unitsOut, tensOut, hundredsOut;

    if (number === 0) {
        return 'zéro';
    } else {
        // Traitement des unités
    
        unitsOut = (units === 1 && tens > 0 && tens !== 8 ? ' et ' : '') + units2Letters[units];
    
        // Traitement des dizaines
    
        if (tens === 1 && units > 0) {
    
        tensOut = units2Letters[10 + units];
        unitsOut = '';
    
        } else if (tens === 7 || tens === 9) {
    
            tensOut = tens2Letters[tens] + ' ' + (tens === 7 && units === 1 ? 'et ' : '') + units2Letters[10 + units];
           unitsOut = '';
    
        } else {
    
          tensOut = tens2Letters[tens];
    
        }
    
        tensOut += (units === 0 && tens === 8 ? 's' : '');
    
        // Traitement des centaines
    
        hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + ' ' : '') + (hundreds > 0 ? 'cent' : '') + (hundreds > 1 && tens == 0 && units == 0 ? 's' : '');
    
        //traitement des milliers
        thousandsOut = (thousands > 1 ? units2Letters[thousands] + ' ' : '') + (thousands > 0 ? 'mille' : '') + (thousands > 1 && tens == 0 && units == 0 ? 's' : '');
        // Retour du total
    
        return thousandsOut+' '+hundredsOut + (hundredsOut && tensOut ? ' ': '') + tensOut + (hundredsOut && unitsOut || tensOut && unitsOut ? ' ': '') + unitsOut;
    }
}
let displayfactures=function(factures,debut,fin){
   
    for(i=debut;i<fin;i++){
        var paper='<div class="paper" id="paper">';
        currentFacture=(factures.length>0?listeFactures[i]:
            {
                nfact:1000,
                date: "01/01/2020",
                codeClient:9999,
                nameClient:"xxxxxx",
                htva:9999,
                txtva:99,
                tva:9999,
                dt:9999,
                ttc:9999,
                qte:9999,
                mf:"ffffff",
                adresse:"adresse clt"
              });
              var codeclt=currentFacture.codeClient;
              var nomclt=currentFacture.nameClient;
              var codef=currentFacture.nfact;
              var datef=currentFacture.date;
              var qte=Number(currentFacture.qte).toFixed(3);
              var txtva=Number(currentFacture.txtva).toFixed(3);
              var mnthtva=Number(currentFacture.htva).toFixed(3);
              var mnttva=Number(currentFacture.tva).toFixed(3);
              var ttc=Number(currentFacture.ttc).toFixed(3);
              var mf=currentFacture.mf;
              var adresse=currentFacture.adresse;
              //calcule prix unitaire
              var prixht=parseInt(currentFacture.htva).toFixed(3);
              var quantite=parseInt(currentFacture.qte).toFixed(3);
              var PU=(prixht/quantite).toFixed(3);
              var totalht=Number(currentFacture.htva).toFixed(3);
              var mnttva=Number(currentFacture.tva).toFixed(3);
              var timbre=Number(0.600).toFixed(3);
              var net=(Number(totalht)+Number(mnttva)+0.600).toFixed(3);
              //afficher le montant en lettres
            var intpart=Math.trunc(net);
            var decpart=Math.trunc(net);
            var mntlettreint=num2Letters(parseInt(intpart, 10));
            var mntlettresdec=Math.trunc((net-decpart)*1000);
    var box = `
    <div class="container" id="fcontainer">
        <div class="adresse">
            <span class="ligne1">Sté Gharbi Marbre S.A</span><br>
            <p>Lessouda Sidi Bouzid
                Capital:766MD
            </p>
            <p>Capital:766MD</p>
            <p>
                RC:B1844372013 - MF1288148V/A/M/000
            </p>
            
        </div>
        <div class="logo">
            <img src="img/sigle.jpeg" alt="">
        </div>
    </div>
    <div class="container">
        <div class="gadget">
            <div class="gadget-entete">Facture</div>
            <div class="gadget-inf">
                <table>
                    <tr>
                        <td class="gras">N°:</td>
                        <td><label id="numfact">${codef}</label></td>
                    </tr>
                    <tr>
                        <td class="gras">Date:</td>
                        <td><label id="datefact">${datef}</label></td>
                    </tr>
                    <tr>
                        <td class="gras">Page:</td>
                        <td><label id="pagefact">1</label></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="gadget">
            <div class="gadget-entete">Client</div>
            <div class="gadget-inf">
                <table>
                    <tr>
                        <td class="gras">Code:</td>
                        <td><label id="codeclient">${codeclt}</label></td>
                    </tr>
                    <tr>
                        <td class="gras">Nom:</td>
                        <td><label id="nomclient">${nomclt}</label></td>
                    </tr>
                    <tr>
                        <td class="gras">Adresse:</td>
                        <td><label id="adresse"> Sidi Bouzid</label></td>
                    </tr>
                    <tr>
                        <td class="gras">MF:</td>
                        <td><label id="MF">${mf}</label></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="container">
        <table class="articles">
            <tr class="articles-entete">
                <td>designation</td>
                <td>Qté</td>
                <td>PU</td>
                <td>Total Ht</td>
                <td>TVA %</td>
                <td>Mnt TVA</td>
                <td>Total TTC</td>
            </tr>
            <tr class="normalline">
                <td id="designation">SCIAGE</td>
                <td id ="qte">${qte}</td>
                <td id="pu">${PU}</td>
                <td id="totalht">${mnthtva}</td>
                <td id="tva">${txtva}</td>
                <td id="mnttva">${mnttva}</td>
                <td id="totalttc">${totalht}</td>
            </tr>
            
        </table>
    </div>
    <div class="container">
        <div class="left">
        <p class="phrase">Arrétée la présente facture ala somme de:</p> 
        <p><label id="mntlettreint">${mntlettreint}</label> Dinars et <label id="mntlettresdec">${mntlettresdec}</label>millimes</p>
        </div>
        <div class="right">
            <table class="totaux">
                <tr>
                    <td class="gras">Toatal HT:</td>
                    <td><label id="totalhtbas">${totalht}</label></td>
                </tr>
                <tr>
                    <td class="gras">Montant TVA:</td>
                    <td><label id="mnttvabas">${mnttva}</label></td>
                </tr>
                <tr>
                    <td class="gras">Timbre fiscale:</td>
                    <td><label id="timbre">${timbre}</label></td>
                </tr>
                <tr>
                    <td class="gras">Net à payer:</td>
                    <td><label id="net">${net}</label></td>
                </tr>
            </table>
        </div>
    </div>
    `;
    paper+=box;
    paper+='</div>';
    document.getElementById('papers').innerHTML+=paper;
    }
    
}
var currentFacture=new Array();
window.onload = function() {
    const nextfact=document.getElementById('nextfact');
    const prevfact=document.getElementById('prevfact');
    displayfactures(listeFactures,debut,fin);
    //liste suivante 
    nextfact.addEventListener('click',(event)=>{
        debut=fin;
        if(listeFactures.length-fin>50){
            fin+=50;
        }else{
            fin=listeFactures.length;
        }
        sessionStorage.setItem("debut",debut);
        sessionStorage.setItem("fin",fin);
        location.reload();
    });
    //liste precedente
    prevfact.addEventListener('click',(event)=>{
        fin=debut;
        if(debut>50){
            debut-=50;
        }else{
            debut=1;
        }
        sessionStorage.setItem("debut",debut);
        sessionStorage.setItem("fin",fin);
        location.reload();
        });
    //imprimer
    print=document.getElementById('print');
    print.addEventListener('click',(event)=>{
        var element = document.getElementById('papers'); 
        var filename=currentFacture.nfact;
        //easy
        //html2pdf().from(element).save();

        //custom file name
        html2pdf().set({filename: 'facture'+filename+'.pdf'}).from(element).save();
        

        //more custom settings
        /*var opt = 
        {
          margin:       1,
          filename:     'facture'+filename+'.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();*/
    });
    //retour accueil
    home=document.getElementById('home');
    home.addEventListener('click',(event)=>{
        window.location.href='index.html'
    });
}

