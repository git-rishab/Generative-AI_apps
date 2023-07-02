const convertBtn = document.getElementById('convertBtn');
const debugBtn = document.getElementById('debugBtn');
const checkQualityBtn = document.getElementById('checkQualityBtn');
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const url = "http://localhost:5000"

convertBtn.addEventListener('click', async() => {
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;
    if(!language){
        return alert("Please select language to convert")
    }
    showLoader();
    const req = await fetch(`${url}/code/convert/${language}`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({code: code})
    })
    const res = await req.json();
    if(res.ok){
        createDOM(res.code)
    } else {
        alert("You have reached the limit. Please wait for 5 minutes to make another request!")
    }
    hideLoader();
});

debugBtn.addEventListener('click', async() => {
    const code = document.getElementById('code').value;

    showLoader();
    const req = await fetch(`${url}/code/debug`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({code: code})
    })
    const res = await req.json();
    if(res.ok){
        createDOM(res.code)
    } else {
        alert("You have reached the limit. Please wait for 5 minutes to make another request!")
    }
    hideLoader();
});

checkQualityBtn.addEventListener('click', async() => {
    const code = document.getElementById('code').value;
    showLoader();
    const req = await fetch(`${url}/code/quality`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({code: code})
    })
    const res = await req.json();
    if(res.ok){
        createDOM(res.code)
    } else {
        alert("You have reached the limit. Please wait for 5 minutes to make another request!")
    }
    hideLoader();
});

function showLoader() {
    loader.style.display = 'block';
    result.innerHTML = '';
}

function hideLoader() {
    loader.style.display = 'none';
}

function displayResult(data) {
    result.innerHTML = data;
}

function createDOM(res) {
    result.innerHTML = null
    res = res.split("\n");
    res.forEach(el => {
        const p = document.createElement("p");
        p.innerText = el;
        result.append(p)
    });
}