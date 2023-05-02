import { useState, useEffect } from "react"
import { TProduct } from "../types/TProduct.type"
import Prod from "./prod";

export default function Product() {

    const [product, setProduct] = useState<TProduct[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [showInput, setShowInput] = useState(false);

    


    async function createProduct() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity })
        }

        const result = await fetch(`http://localhost:3000/api/product/`, options);
        const response = await result.json();
        setProduct([...product, response.data]);
        setName("");
        setPrice(0);
        setQuantity(0);
        setShowInput(false)
    }

    function add() {
        setShowInput(!showInput)
    }

    async function getProduct() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const result = await fetch('http://localhost:3000/api/product', options)
        const response = await result.json();
        setProduct(response.data);
    };


    useEffect(() => {
        getProduct();
    }, []);

    function patchProduct(item:TProduct) {
        const newProduct = product?.map(elm => {
            if (elm.id !== item.id) {
                return elm;
            }
            return item;
        });
       setProduct(newProduct);
    }


    
    async function deleteProduct(id: number) {
        const newProduct = product.filter(item => item.id !== id);
        setProduct(newProduct);
    }


    const produit = product?.map(pr => <Prod delete={deleteProduct} patch={patchProduct} update={patchProduct} produit={pr} key={pr.id}
    />)

    return (
        <div className="container">

            <div className="bg-primary">
                <h2 className="text-center">Produits</h2>
            </div>
            <button onClick={add} type="button" className="btn btn-primary btn-sm mb-2"> Ajouter un produit</button>
            {showInput && <fieldset >
                <div >
                    <input className="form-control" type="text" placeholder="nom " value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="">
                    <input className="form-control" type="text" placeholder="prix" value={price} onChange={(e) => setPrice(+e.target.value)} />
                </div>

                <div className="text-success ">
                    <input className="form-control" type="text" placeholder="quantité" value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
                </div>
                <button onClick={() => createProduct()} type="button" className="btn btn-primary btn-sm mb-2">Ajouter</button>
            </fieldset>}

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {produit}

                </tbody>
            </table>
        </div>
    )

}




