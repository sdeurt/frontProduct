import { useState, useEffect, useRef } from "react";
import { TPprod } from "../types/TProd.type";
import { TProduct } from "../types/TProduct.type";
type TProps = {
    produit: TProduct
}
export default function Prod(props: TProps) {

    const pr = props.produit;

    const [selectProd, setSelectProd] = useState(
        {
            id:"",
            name: "",
            price: "",
            quantity: ""
        }
    );
     useEffect(() => {

        async function fetchData() {

            if (selectProd) {

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                };
                const result = await fetch(`http://localhost:3000/api/product/${pr.id}`, options);
                const response = await result.json();
                console.log(response);

                setSelectProd(response);
            }
        }
        fetchData();

    }, []); 

    return (
        <tr>
            <td scope="col">{pr.id}</td>
            <td>{pr.name}</td>
            <td>{pr.price}</td>
            <td>{pr.quantity}</td>
            <td>
                <button type="submit" className="btn btn-primary btn-sm mb-2 me-2" >Modifier</button>
                <button type="submit"className="btn btn-success btn-sm mb-2 me-2">valider</button>
                <button type="submit" className="btn btn-danger btn-sm mb-2 me-2">supprimer</button>
            </td>
        </tr>
    )

}



