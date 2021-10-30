let eskiText = ""

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }


  ac.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        //document.body.innerHTML = "asd"
        eskiText  = document.body.innerHTML;
        let txt   = document.body.innerHTML;

        const url = chrome.runtime.getURL("data/deneme.json");
        await fetch(url)
            .then((response) => {
                Promise.all([response.json()]).then( async value => {
                  for await (const i of value[0]) {
                    if(txt.search(" "+i.kelime+" ") > 0){
                      txt = txt.replace(RegExp(`\\b ${i.kelime} \\b`, 'g'), ' ' + i.kelime + ' <b style="background: #f1f1f1; padding: 3px; border-radius: 3px; font-size: 12px; font-weight: normal; color: red;">'+i.aciklama+'</b>')
                    }
                  }

                  document.body.innerHTML = txt
                })
            }) 

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