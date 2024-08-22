import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
const { Meta } = Card;

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const getProductByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/product-category/${params.slug}`);
            if (response.status === 200) {
                setProducts(response.data.products);
                setCategory(response.data.category);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (params.slug) {
            getProductByCategory();
        }
    }, [params.slug]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 mt-3">Category: {category?.name}</h1>
            <h3 className="text-lg mb-4">{products.length} products found</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Card
                        key={product._id}
                        cover={
                            <img
                                alt={product.name}
                                src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                        }
                        className="flex flex-col"
                        bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                        <Meta
                            title={product.name}
                            description={`$${product.price}`}
                            className="mb-4"
                        />
                        <div className="mt-4 flex justify-between ">
                            <Button type="primary" size="small">
                                <Link
                                    to={`/productDetails/${product.slug}`}
                                    state={{ fromCategoryProduct: true }}
                                >
                                    Details
                                </Link>
                            </Button>
                            <Button type="default">Add to Cart</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CategoryProduct;
