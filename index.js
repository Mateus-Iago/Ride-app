const rideListElement = document.querySelector("#rideList")
 const allRides = getAllRides()

allRides.forEach(async ([id, value]) => {

    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3 "
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", () => {
        window.location.href = `detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstlocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)
    
    const mapId = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapId
    mapElement.style = "width:100px;height:100px"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    
    const map = L.map(mapId, {
        zoomControl : false,
        draggin: false,
        attributionControl: false,
        scrollWheelZoom: false
    })
    map.setView([firstPosition.latitude, firstPosition.longitude], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)

})

