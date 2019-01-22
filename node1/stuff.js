


let obj = {
    name: "Tom",
    location: {
        address: "100 A Street"
    },
    places: [
        {
            name: "San Francisco",
            state: "Ca"
        },
        {
            name: "New York",
            state: "NY"
        }

    ]


};


console.log(obj.name);
console.log(obj.location.address);

obj.places.forEach(element => {
    console.log("Place: " + element.name + "," + element.state);
});
