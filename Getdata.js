import { useState, useEffect } from "react";

const GetData = () => {
    const [style, setStyle] = useState([]);

    useEffect( () => {

        fetch("data.json")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error while fetching the data')
            }
        })
        .then((dataJSON) => {
            console.log(dataJSON)
            setData(dataJSON);
        })
        .catch((error) => {
            console.error(error);
            // console.log(response.body);
          });
    }, [])
        

    return (
        <div>
            {/* {parameters} */}
            Get Data
            
        </div>
    )
}

export default GetData