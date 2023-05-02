import { useState, useEffect } from "react";
import { TProduct } from "../types/TProduct.type";

type TProps = {
    delete(id: number): unknown ;
    patch: (item: TProduct) => void;
    update:(item: TProduct) => void
    produit: TProduct
}
export default function Prod(props: TProps) {

    const [name, setName] = useState<string>(props.produit.name);
    const [price, setPrice] = useState<number>(props.produit.price);
    const [quantity, setQuantity] = useState<number>(props.produit.quantity);
    const [showInput, setShowInput] = useState(false)


    const pr = props.produit;


    async function patchProduct() {

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price,
                quantity: quantity
            })


        };

        const result = await fetch(`http://localhost:3000/api/product/${pr.id}`, options);
        const response = await result.json();
        console.log(response.data);

        if (response.statusCode === 200) {
            props.patch(response.data)

        };
    }

    async function deleteProduct() {

        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        const result = await fetch(`http://localhost:3000/api/product/${pr.id}`, options)
        const response = await result.json()

        if (response.statusCode === 200) {
            props.delete(pr.id);
        }
    };

    function update() {
        setShowInput(!showInput)
    };


    return (

        <>
            <tr>
                <td scope="col">{pr?.id}</td>
                <td>{pr?.name}</td>
                <td>{pr?.price}</td>
                <td>{pr?.quantity}</td>
                <td>

                    <button onClick={update} type="button" className="btn btn-primary btn-sm mb-2 me-2" >Modifier</button>

                    <button onClick={deleteProduct} type="button" className="btn btn-danger btn-sm mb-2 me-2">supprimer</button>
                </td>
            </tr>

            {showInput && <>

                <tr>
                    <th scope="row">{pr?.id}</th>
                    <td><input type='text' className="form-control bg-light" value={name} placeholder="Modifier le nom " onChange={(e) => setName(e.target.value)} aria-label="Recipient " aria-describedby="button-addon2" autoFocus></input></td>
                    <td ><input type='text' className="form-control bg-light " value={price} placeholder="Modifier le prix " onChange={(e) => setPrice(+e.target.value)} aria-label="Recipient " aria-describedby="button-addon2"></input></td>
                    <td ><input type='text' className="form-control bg-light" value={quantity} placeholder="Modifier la quantité " onChange={(e) => setQuantity(+e.target.value)} aria-label="Recipient" aria-describedby="button-addon2"></input></td>

                    <button
                        onClick={patchProduct}  type="button" className="btn btn-outline-success btn-sm" data-mdb-ripple-color="dark" >


                    </button>
                </tr>

            </>}

        </>

    )
}

