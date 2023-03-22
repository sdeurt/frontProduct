import { useState, useEffect, useRef } from "react"
import { TProduct } from "../types/TProduct.type"
import Prod from "./prod";

export default function Product() {

    const [product, setProduct] = useState<TProduct[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
   // const [showInput,setShowInput] = useState(false)
   // const [addProduct, setAddProduct] = useState()
   // const [editingProductId, setEditingProductId] = useState(null);
   // const [editProduct, SetEditProduct] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            const result = await fetch(`http://localhost:3000/api/product/`, options);
            const response = await result.json();
            console.log(response);

            setProduct(response);
        };
        fetchData();
    }, []);


    const produits = product.map(pr =>
        <Prod produit={pr} />

    )

    async function createProduct() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity })
        }
        
        const result = await fetch(`http://localhost:3000/api/product/`, options);
        const newProduct = await result.json();
        setProduct([...product, newProduct]);
       // setShowInput(false)
    }

  
    
return (
    <>
        <div className="container">

            <div className="bg-primary">
                <h2>Products</h2>
            </div>

            <div >
                <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                
            </div>
            <div className="">
                <input className="form-control" type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>

            <div className="text-success ">
                <input className="form-control" type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <button type="submit"  className="btn btn-primary btn-sm mb-2">Ajouter</button>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {produits}

                </tbody>
            </table>

        </div>
    </>
)
    
    }




