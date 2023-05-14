const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)
console.log(ride)

document.addEventListener("DOMContentLoaded", async () => {

const firstPosition = ride.data[0]
const firstlocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"
    
    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstlocationData.city} - ${firstlocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = "h5"

    const totalDistanceDiv = document.createElement("div")
    totalDistanceDiv.innerText  = `Distance ${getDistance(ride.data)} Km`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(totalDistanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    document.querySelector("#data").appendChild(dataElement)

    const deleteButton = document.querySelector("#deleteBtn")
    deleteButton.addEventListener("click", ()=>{

        deleteRide(rideID)
        window.location.href = "./"

    })

    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const positionArray = ride.data.map((position =>{
    return [position.latitude, position.longitude]
}))

const polyline = L.polyline(positionArray, {color: "#F00"})
polyline.addTo(map)

map.fitBounds(polyline.getBounds())
})