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
var currentf=1;
listeFactures = JSON.parse(sessionStorage.getItem('listeFactures'));
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
//affichage données facture
let displayfacture=function(facture){
        document.getElementById('codeclient').innerText=currentFacture.codeClient;
        document.getElementById('nomclient').innerText=currentFacture.nameClient;
        document.getElementById('numfact').innerText=currentFacture.nfact;
        document.getElementById('datefact').innerText=currentFacture.date;
        document.getElementById('qte').innerText=Number(currentFacture.qte).toFixed(3);
        document.getElementById('tva').innerText=Number(currentFacture.txtva).toFixed(3);
        document.getElementById('totalht').innerText=Number(currentFacture.htva).toFixed(3);
        document.getElementById('mnttva').innerText=Number(currentFacture.tva).toFixed(3);
        document.getElementById('totalttc').innerText=Number(currentFacture.ttc).toFixed(3);
        document.getElementById('MF').innerText=currentFacture.mf;
        document.getElementById('adresse').innerText=currentFacture.adresse;
        //calcule prix unitaire
        var prixht=parseInt(currentFacture.htva).toFixed(3);
        var quantite=parseInt(currentFacture.qte).toFixed(3);
        var PU=prixht/quantite;
        document.getElementById('pu').innerText=Number(PU).toFixed(3);
        console.log(Number(currentFacture.tva).toFixed(3));
        //les totaux
        var totalht=Number(currentFacture.htva).toFixed(3);
        var mnttva=Number(currentFacture.tva).toFixed(3);
        document.getElementById('totalhtbas').innerText=totalht;
        document.getElementById('mnttvabas').innerText=mnttva;
        document.getElementById('timbre').innerText=Number(0.600).toFixed(3);
        document.getElementById('net').innerText=(Number(totalht)+Number(mnttva)+0.600).toFixed(3);
        //afficher le montant en lettres
        var net=Number(totalht)+Number(mnttva)+0.600;
        var intpart=Math.trunc(net);
        var decpart=Math.trunc(net);
        document.getElementById('mntlettreint').innerHTML=num2Letters(parseInt(intpart, 10));
        document.getElementById('mntlettresdec').innerHTML=Math.trunc((net-decpart)*1000);
}

var currentFacture=listeFactures[currentf];
window.onload = function() {
    const nextfact=document.getElementById('nextfact');
    const prevfact=document.getElementById('prevfact');
    currentFacture=listeFactures[currentf];
        displayfacture(currentFacture);
    //facture suivante 
    nextfact.addEventListener('click',(event)=>{
        if(currentf<listeFactures.length){
            currentf++;
            currentFacture=listeFactures[currentf];
            displayfacture(currentFacture);
        }
    });
    //facture precedente
    prevfact.addEventListener('click',(event)=>{
        
        if(currentf>1){
            currentf--;
            currentFacture=listeFactures[currentf];
            displayfacture(currentFacture);
        }
        
        });
    //imprimer
    print=document.getElementById('print');
    print.addEventListener('click',(event)=>{
        var element = document.getElementById('paper'); 
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

