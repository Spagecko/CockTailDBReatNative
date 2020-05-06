
function returnData (value){
    console.log("VALUE")
    console.log(value); 
    return(value)
}
   function myData (id, callback)
{ let ReturnThisData = null;
    console.log("PASSING ID");
    console.log(id);
    let data =    fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i="+id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key": "76a2217e52msh94dc0420581080cp1174f8jsn0ec504725a95"
        }
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(err => {
        console.log(err);
    });


    console.log("RETURNING DATA");
    console.log(data);
   callback(data);
}

export default myData; 