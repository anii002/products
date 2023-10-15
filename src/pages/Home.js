
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { addProduct, deleteProduct, productData, sortPrice, } from "../reduce/productReducer";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedValue, setSelectedValue] = useState(null);
    const { loading, product } = useSelector((state) => state.product.data);
    const [products, setProducts] = useState({
        image: "",
        title: "",
        description: "",
        price: "",
    });

    const handleChange = (e) => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (products.description && products.image && products.price && products.title) {
            let id = Math.floor(Math.random() * 100) + 1;
            dispatch(addProduct({ ...products, id: id }))
            handleClose()

        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productData());
    }, [])
    const handleItemClick = (name) => {
        setSelectedValue(name);
        dispatch(sortPrice(name))
    };




    return (
        <>
            <section className="container-fluid home-info">
               
                <div className="d-flex flex-wrap  justify-content-between mt-4">
                    <h4>App Name</h4>
                    <div className='d-flex'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                {selectedValue ? selectedValue : "Sort by price"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleItemClick("Low to High")} name="low" >Low to High</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleItemClick("High to low")} name="high" >High to low</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button className="btn btn-primary mx-3" onClick={handleShow}>Add Product</button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               
                                <form>
                                    <div className="form-group  gap-2 ">
                                        <label >image</label>
                                        <input type="text" name='image' className="form-control" placeholder="Enter Image" required value={productData.image} onChange={handleChange} />
                                    </div>
                                    <div className="form-group  gap-2 mt-2">
                                        <label>title</label>
                                        <input type="text" name='title' className="form-control" placeholder="Enter title" required value={productData.title} onChange={handleChange} />
                                    </div> <div className="form-group gap-2 mt-2">
                                        <label >description</label>
                                        <input type="text" name='description' className="form-control" placeholder="Enter Description" required value={productData.description} onChange={handleChange} />
                                    </div> <div className="form-group  gap-2 mt-2">
                                        <label >price</label>
                                        <input type="text" name='price' className="form-control" placeholder="Enter Price" required value={productData.price} onChange={handleChange} />
                                    </div>
                                </form>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={onSubmit}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="mx-2 row row-cols-1  row-cols-sm-2 row-cols-md-5 gap-3  justify-content-center mt-5">
                    {
                        product.length === 0
                        &&
                        <h4 className="empty mx-auto"> Product is Empty</h4>
                    }
                    {loading ? (
                        <div>Loading....</div>
                    ) : (
                        product && product.map((item) => (
                            <div className=" mb-2 shadow-lg rounded-4" key={item.id}>
                                <Link to={`/info/${item.id}`}>
                                    <div className='mx-auto' style={{ width: "100px", height: "100px" }}>
                                        <img className="rounded img-fluid mt-3 " src={item.image} alt="logo" width="100px" height="100px" style={{ objectFit: "cover" }} />
                                    </div>
                                    <div style={{ marginTop: "80px" }}>
                                        <h4 className="info text-truncate">{item.title}</h4>
                                        <h5 className="info"> ₹{item.price}</h5>
                                    </div>
                                </Link>
                                <button className='btn btn-sm btn-danger mb-2 float-end' onClick={() => dispatch(deleteProduct(item.id))}>delete</button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
