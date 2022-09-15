const API = 'https://api.thedogapi.com/v1';
const button = document.querySelector('#recharge-btn');
const span = document.querySelector('#pad-error');
const addButton = document.querySelector('.favorite-btn');

//Data of API
async function fetchRandomData () {
    try {
        const response = await fetch(`${API}/images/search?limit=3&order=Desc?api_key=live_fCSgg8abIpgqxGjVdLGWCanlSVPcymY7OUIEeSPTdOAX2CP25FWQ8VVCSBw0katA`);
        const data = await response.json();

        if (response.status != 200) {
            span.innerHTML = `Error ${response.status} ${response.message}`;
        } else {
            const img1 = document.querySelector('#img1-con');
            const img2 = document.querySelector('#img2-con');
            const img3 = document.querySelector('#img3-con');
            const btn1 = document.querySelector('#btn-1');
            const btn2 = document.querySelector('#btn-2');
            const btn3 = document.querySelector('#btn-3');

            img1.src = data[0].url;
            img2.src = data[1].url;
            img3.src = data[2].url;

            btn1.onclick = () => addFavorities(data[0].id);
            btn2.onclick = () => addFavorities(data[1].id);
            btn3.onclick = () => addFavorities(data[2].id);
        }
    } catch (error) {
        console.log(error);
    }
};

//Data of Api/favourites
async function favoriteData () {
    try {
        const response = await fetch(`${API}/favourites?api_key=live_fCSgg8abIpgqxGjVdLGWCanlSVPcymY7OUIEeSPTdOAX2CP25FWQ8VVCSBw0katA`);
        const data = await response.json();

        if (response.status !== 200) {
            span.innerHTML = `Hubo un error: ${response.status} ${data.message}`;
        } else {
            const section = document.querySelector('.favorite-container');
            section.innerHTML = '';
            data.forEach(element => {
                //Creat elements DOM
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Delete favorites');

                //ApendCHilds of elements
                btn.appendChild(btnText);
                btn.onclick = () => deleteFavorities(element.id);
                img.src = element.image.url;
    
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);
            });
        }
        
    } catch (error) {
        console.log(error);
    }
};

//Add favourites of API
async function addFavorities (id) {
    try {
        const response = await fetch(`${API}/favourites?api_key=live_fCSgg8abIpgqxGjVdLGWCanlSVPcymY7OUIEeSPTdOAX2CP25FWQ8VVCSBw0katA`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                image_id: id
            }),
        });
        const data = await response.json();
        if (response.status !== 200) {
            span.innerHTML = `Hubo un error ${response.status} ${data.message}`;
        } else {
            console.log('save');
            favoriteData();
        }
    } catch (error){
        console.log(error);
    }
};

async function deleteFavorities (id) {
    try {
        const response = await fetch(`${API}/favourites/${id}?api_key=live_fCSgg8abIpgqxGjVdLGWCanlSVPcymY7OUIEeSPTdOAX2CP25FWQ8VVCSBw0katA`, {
            method: 'DELETE',
        });
        const data = await response.json();

        if (response.status !== 200) {
            span.innerHTML = `Hubo un error: ${response.status} ${data.message}`;
        } else {
            console.log('Delete');
            favoriteData();
        };
    } catch (error){
        console.log(error);
    }
};

async function uploadImage () {
    try {
        const form = document.querySelector('#form');
        const formdata = new FormData(form);

        const response = await fetch(`${API}/images/upload`, {
            method: 'POST',
            headers: {
                // 'Content-type': 'multipart/form-data',
            },
            body: formdata,
        });
        const data = await response.json();

    } catch (error){
        console.log(error);
    }
}

//Call functions
fetchRandomData();
favoriteData();
button.addEventListener('click', fetchRandomData);