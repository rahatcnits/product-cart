import React, {useEffect, useState} from 'react';
import axios from "axios";
import Helper from "../utility/Helper.jsx";
import FullScreenLoader from "./FullScreenLoader.jsx";

const ProductList = () => {
    let [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            await CallProductList();
        })()
    }, [])

    const CallProductList = async () => {
        let res = await axios.get(`${Helper.API_BASE}/product-list`);
        let productList = res.data["data"];
        setData(productList);
    }
    return (
        <div>
            {
                data==null ? (<FullScreenLoader/>) : (
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            {
                                data.map((item, i) => {
                                    return (
                                        <div className="col-md-6 col-lg-3">
                                            <div className="card p-3 mt-4">
                                                <img className="w-100" src={item["image"]} />
                                                <h5>
                                                    PRICE: $
                                                    {
                                                        item["discount"]===0 ? (<span>{item["price"]}</span>) : (<span><strike>{item["price"]}</strike> {item["discount_price"]}</span>)
                                                    }
                                                </h5>
                                                <p>{item["title"]}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductList;