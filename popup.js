let eskiText = ""



  ac.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        //document.body.innerHTML = "asd"
        eskiText  = document.body.innerHTML;
        let txt   = document.body.innerHTML;

        const url = chrome.runtime.getURL("data/sozluk.json");
        const img = chrome.runtime.getURL("data/translate.png");
        console.log(img);
        await fetch(url)
            .then((response) => {
                Promise.all([response.json()]).then( async value => {
                  let newFilter = []
                  var list = value[0].list;

                  let json = list.filter(i => {
                      if(!newFilter.includes(i.kelime)){
                          newFilter.push(i.kelime)
                          return true
                      }
                  })
                  
                  for await (const i of json) {
                    if(filter(txt, i.kelime)){
                      let kelime   = i.kelime;
                      let aciklama = i.aciklama;
                      let kelimeRegex   = "\\b"+kelime[0].toUpperCase()+"?"+kelime[0]+"?"+kelime.substr(1)+"([.,?])? \\b";
                    

                      //txt = txt.replace(RegExp(kelimeRegex, 'g'), ' ' + kelime+ '<b translate="no" style="background: #f1f1f1; padding: 3px; border-radius: 3px; font-size: 10px; font-weight: normal; color: red;">'+aciklama+'</b> ')
                      txt = txt.replace(RegExp(kelimeRegex, 'g'), ' ' + kelime+ ' <img title="'+aciklama+'" style="max-width: 15px" src="'+img+'"> ')
                    }
                  }

                  document.body.innerHTML = txt
                })
            }) 


        function filter(txt, kelime){
          durum = false
          if(txt.search(" "+kelime+" ") > 0){
            return true
          }

          if(txt.search(" "+kelime+".") > 0){
            return true
          }

          return durum

        }

      },

    });
  });



  kapat.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        document.body.innerHTML = eskiText;
      },

    });
  });


  /*
        function readTextFile(txt){
          const url = chrome.runtime.getURL("data/deneme.json");
          fetch(url)
              .then((response) => {
                  Promise.all([response.json()]).then(value => {
                
                      value[0].map(i => txt.replace(RegExp(/'+i.en+'/, 'g'), '<a style="color: red">'+i.tr+'</a>'))

                      return txt
                  })
              }) 
        
        }
  */