function travelapifetch() {
    //const searchcountry = document.getElementById('searchbar').value.toLowerCase();
    //const resultDiv = document.getElementById('result');
    //resultDiv.innerHTML = '';
    const res='';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        //const condition = data.countries.find(item => item.name.toLowerCase() === searchcountry);

        data.countries.forEach(country => {
            console.log(country.id);
            console.log(country.name);
            country.cities.forEach(city => {
                console.log(city.name);
                console.log(city.imageUrl);
                console.log(city.description);
            })
        });

        data.temples.forEach(temple => {
            console.log(temple.id);
            console.log(temple.name);
            console.log(temple.imageUrl);
            console.log(temple.description);
        });

        data.beaches.forEach(beach => {
            console.log(beach.id);
            console.log(beach.name);
            console.log(beach.imageUrl);
            console.log(beach.description);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        //resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

function normalizeWord(word) {
    word = word.toLowerCase().trim();
  
    // Handle plurals ending with "ies" → "y"
    if (word.endsWith("ies") && word.length > 3) {
        return word.slice(0, -3) + "y";
    }
    // handle "es" plurals → remove "es"
    if (word.endsWith("es")) {
      return word.slice(0, -2);
    }
  
    // handle simple "s" plurals → remove "s"
    if (word.endsWith("s")) {
      return word.slice(0, -1);
    }
  
    return word;
  }

function keywordsearch(userinpt) {
    const baseword=normalizeWord(userinpt);
    let searchfor="";

    if(baseword=="beach"){
        searchfor="beaches";
    }
    else if(baseword=="temple" || baseword=="templ"){
        searchfor="temples";
    }
    else if(baseword=="country"){
        searchfor="countries";
    }

    return searchfor;
  }

//Task 8
function recommendationforquery(){
    const userinput=document.getElementById('searchbar').value;
    const searchfor=keywordsearch(userinput);

    const result=document.getElementById('rescontent');
    result.innerHTML='';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty(searchfor)) {  //if the keyword matches
            console.log("Place exists!");
/*
            if(searchfor=="countries"){
                data.countries.forEach(country=>{
                    country.cities.forEach(city=>{
                        result.innerHTML+=`<h2>${city.name}</h2>`;
                        result.innerHTML+=`<img src="${city.imageUrl}" alt="hjh">`;
                        result.innerHTML+=`<p>${city.description}</p>`;
                    });
                });
            }
            else if(searchfor=="temples"){
                data.temples.forEach(temple=>{
                    result.innerHTML+=`<h2>${temple.name}</h2>`;
                    result.innerHTML+=`<img src="${temple.imageUrl}" alt="hjh">`;
                    result.innerHTML+=`<p>${temple.description}</p>`;
                    });
                }
            else if(searchfor=="beaches"){
                data.beaches.forEach(beach=>{
                    result.innerHTML+=`<h2>${beach.name}</h2>`;
                    result.innerHTML+=`<img src="${beach.imageUrl}" alt="hjh">`;
                    result.innerHTML+=`<p>${beach.description}</p>`;
                    });
                }
                */
                if (searchfor == "countries") {
                    data.countries.forEach(country => {
                      country.cities.forEach(city => {
                        result.innerHTML += `
                          <div class="card">
                            <h2>${city.name}</h2>
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <p>${city.description}</p>
                          </div>
                        `;
                      });
                    });
                  }
                  else if (searchfor == "temples") {
                    data.temples.forEach(temple => {
                      result.innerHTML += `
                        <div class="card">
                          <h2>${temple.name}</h2>
                          <img src="${temple.imageUrl}" alt="${temple.name}">
                          <p>${temple.description}</p>
                        </div>
                      `;
                    });
                  }
                  else if (searchfor == "beaches") {
                    data.beaches.forEach(beach => {
                      result.innerHTML += `
                        <div class="card">
                          <h2>${beach.name}</h2>
                          <img src="${beach.imageUrl}" alt="${beach.name}">
                          <p>${beach.description}</p>
                        </div>
                      `;
                    });
                  }
            }
            else {
                console.log("Place does not exist.");
          } 
        })
        .catch(error => {
          console.error('Error:', error);
          //resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
    }


// Task 9: Clear button
function resetsearch() {
    // Clear the results container
    document.getElementById("rescontent").innerHTML = "";
  
    // Clear the search bar (if you want this too)
    document.getElementById("searchbar").value = "";
  
    console.log("Results cleared");
  }
  
  // Attach event listener
  document.getElementById("resetbutton").addEventListener("click", (event) => {
    event.preventDefault(); // safety, avoids form-like behavior
    resetsearch();
  });



const submitsearch=document.getElementById('submitsearch');
submitsearch.addEventListener('click',recommendationforquery);

/*
const resetsearch=document.getElementById('resetbutton');
resetsearch.addEventListener('click',resetsearch);
*/

travelapifetch();


const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);