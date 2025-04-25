import { useDispatch, useSelector } from "react-redux";
import { getImages, postProduct } from "../../redux/slice/addProductsSlice";
import { useRef } from "react";

export default function ProductDiscription() {
  const titleRef = useRef();
  const discriptionRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();

  const selectedImages = useSelector(
    (state) => state.addProducts.selectedImages
  );

  const userID = useSelector((state) => state.loginUser.id);
  const dispatch = useDispatch();

  function submitProducts(event) {
    event.preventDefault();
    //CALL THE BELOW FUNCTION IF WE HAVE TO SUBMIT ALL DETAILS OF A SPECIFIC PRODUCT
    //postProduct();
    const obj = {
      userId: userID,
      title: titleRef.current.value,
      price: priceRef.current.value,
      discription: discriptionRef.current.value,
      qty: qtyRef.current.value,
      imageUrl: selectedImages,
    };
    dispatch(postProduct(obj));
  }

  return (
    <div>
      <form action="">
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" id="title" ref={titleRef} />
        <br />
        <label htmlFor="discription">Discription</label>
        <br />
        <textarea
          ref={discriptionRef}
          name="discription"
          id="discription"
          placeholder="Add Discription"
          rows={5}
          cols={40}
        />
        <br />
        <label htmlFor="qty">Please Enter Quantitiy</label>
        <input type="number" id="qty" ref={qtyRef} />
        <br />
        <label htmlFor="price">Please Enter Price</label>
        <input type="number" id="price" ref={priceRef} />
        <br />
        <label htmlFor="images">Upload Product Images:</label>
        <br />
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={(event) =>
            dispatch(getImages(Array.from(event.target.files)))
          }
        />
        <br />
        <div style={{ marginTop: "10px" }}>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              width="100"
              style={{ marginRight: "10px" }}
            />
          ))}
        </div>
        <button type="submit" onClick={submitProducts}>
          Add Produt
        </button>
      </form>
    </div>
  );
}
