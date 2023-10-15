import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { productData, setProductDescription } from "../reduce/productReducer";

function Info() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const { productDescription } = useSelector((state) => state.product.data);
    useEffect(() => {
        dispatch(productData())
            .then(() => {
                dispatch(setProductDescription(id));
            });
    }, [dispatch]);
    return (
        <>

            <section className="container-fluid">
                <div className="d-flex flex-wrap  justify-content-between mt-4 px-4">
                    <h4> App Name</h4>
                    <Link to="/">  <button className="btn btn-primary">Back</button></Link>
                </div>
                {productDescription && Object.keys(productDescription).length > 0
                    &&
                    <div className="d-flex flex-wrap mt-4 px-5 gap-5">
                        <div className="col-md-3">
                            <img className="rounded img-fluid shadow-lg p-4 rounded-5" src={productDescription.image} alt="logo" />
                        </div>
                        <div className="col-md-4 mt-4">
                            <h4>{productDescription.title} </h4>
                            <p>{productDescription.description}</p>
                            <h4>₹{productDescription.price} </h4>
                        </div>

                    </div>
                }
            </section>
        </>
    )
}


export default Info;