import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from "antd"
import { DoubleLeftOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast"
import { useCart } from '../Context/CartContext';
const ProductDetails = () => {
    const [product, setProduct] = useState({ _id: '', name: '', description: '', price: '', quantity: '' });

    const navigate = useNavigate()
    const location = useLocation()
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [cart, setCart] = useCart()
    const [similarProduct, setSimilarProduct] = useState([])
    const params = useParams();

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params.slug]);

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/get-product/${params.slug}`);
            if (response.status === 200) {

                setProduct(response?.data?.product);
                getSimilarProduct(response?.data?.product?._id, response?.data?.product?.category?._id)
            }
        } catch (e) {
            console.log(e);
        }
    };


    const getSimilarProduct = async (pid, cid) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/related-product/${pid}/${cid}`);
            if (response.status === 200) {
                console.log(response.data?.products)
                setSimilarProduct(response?.data?.products); // Updated to `products`
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    const increaseQuantity = () => {
        if (product?.quantity > selectedQuantity) {

            setSelectedQuantity(prevQuantity => prevQuantity + 1);
        } else {
            toast.error("can not select more than available quantity of the product")
        }
    };

    const decreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleNavigate = () => {
        if (location.state?.fromCategoryProduct) {
            navigate("-1")
        } else {
            navigate("/")
        }
    }

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <Toaster />
            <DoubleLeftOutlined className=' text-4xl shadow-lg shadow-blue-600 font-bold cursor-pointer'
                onClick={handleNavigate} />
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <div className="flex">
                    <div className="w-1/3 pr-4">
                        {product._id && (
                            <img
                                src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
                        <p className="text-gray-700 mb-4">{product?.description}</p>
                        <div className="flex items-center mb-4">
                            <div className="text-lg font-semibold mr-4">Price: ${product?.price}</div>
                            <div className="text-lg font-semibold mr-4">Available Quantity: {product?.quantity}</div>
                            <div className="flex items-center">
                                <button
                                    onClick={decreaseQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 bg-white border-t border-b border-gray-300">{selectedQuantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="w-32 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            onClick={() => {
                                setCart([...cart, product, selectedQuantity])
                                toast.success("product added successfully")
                            }}

                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Placeholder for similar products */}
            <div className="mt-0">
                <h2 className="text-xl font-bold mb-4">Similar Products</h2>
                {similarProduct.length < 1 && (<p className="text-xl font-light mt-2">No similar product found</p>)}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {similarProduct.map((product) => (

                        <Card
                            key={product._id}
                            cover={<img src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                                alt={product.name} className="w-full h-32 object-cover mb-2 rounded-lg" />}
                            style={{ width: 240, height: 260 }}
                            className='flex flex-col'
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <Button type="primary" size="small">
                                    <Link
                                        to={`/productDetails/${product.slug}`}>
                                        Details
                                    </Link>

                                </Button>
                            </div>
                            <p className="text-gray-700 mb-2">${product.price}</p>
                            <p>{product.category?.name}</p>
                        </Card>

                    ))}
                </div>


            </div>

        </div>
    );

};

export default ProductDetails;
