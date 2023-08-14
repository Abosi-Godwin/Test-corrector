let searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', checkError);

let entered = document.querySelector('.entered');

let related = document.querySelector('.related');
let closelyRelated = document.querySelector('.closelyRelated');
let relatedList = document.querySelector('.relatedList');

function checkError() {

  let myHeaders = new Headers();
  myHeaders.append("apikey", "fVeKBbh6Mdw5kN4AyKlivIEYLizTfIYB");

  let input = document.querySelector('#input').value;
  let request = `https://api.apilayer.com/spell/spellchecker?q=${input}`;

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch(request, requestOptions)
    .then(response => response.json())
    .then(result => {
      entered.innerHTML = result.original_text;
      related.innerHTML = '';
      relatedList.innerHTML = '';

      if (result.corrections.length !== 0) 

        related.innerHTML = result.corrections[0].best_candidate;

       else 
        related.innerHTML = 'You entered a correct word';
      
      for (let i = 0; i < result.corrections[0].candidates.length; i++) {

        relatedList.innerHTML += `
  <li>${result.corrections[0].candidates[i]}</li>
`;
      }
    })
    .catch(error => console.log('error', error));
}