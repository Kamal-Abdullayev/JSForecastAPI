let input = document.getElementById("searchCity");
let select = document.querySelector(".typeSelect select");
let button = document.querySelector(".btn.btn-primary");


button.addEventListener("click", () => {
    let locationInput = input.value;

    getData(locationInput)
})



async function getData(locationInput) {
    let url = `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${locationInput}`;

    let response = await fetch(url);
    if (response.status === 200) {
        let data = await response.text();

        let convertData = JSON.parse(data)

        document.getElementById("city").innerText = convertData.location.name;
        document.getElementById("country").innerText = convertData.location.country;

        if (select.value === "Celsius") {
            document.getElementById("wearherForecast").innerText = convertData.current.temp_c;
        } else {
            document.getElementById("wearherForecast").innerText = convertData.current.temp_f;
        }

        document.getElementById("skyConditionIcon").src = convertData.current.condition.icon;
        document.getElementById("skyCondition").innerHTML = convertData.current.condition.text;

    } else {
        let ul = document.getElementById("forecast-info-details");
        let errorMessage = document.getElementById("error")
        ul.style.display = "none";
        errorMessage.style.display = "block";
    }

}

