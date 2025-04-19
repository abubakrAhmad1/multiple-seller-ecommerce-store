import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../redux/slice/addProductsSlice";

export default function ProductDiscription() {
    function submitProducts (event) {
        event.preventDefault();
        //CALL THE BELOW FUNCTION IF WE HAVE TO SUBMIT ALL DETAILS OF A SPECIFIC PRODUCT
        //postProduct();
    }

  const selectedImages = useSelector(
    (state) => state.addProducts.selectedImages
  );
  const dispatch = useDispatch();

  return (
    <div>
      <form action="">
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" id="title" onChange/>
        <br />
        <label htmlFor="discription">Discription</label>
        <br />
        <textarea
          name="discription"
          id="discription"
          placeholder="Add Discription"
          rows={5}
          cols={40}
        />
        <br />
        <label htmlFor="qty">Please Enter Quantitiy</label>
        <input type="number" id="qty" />
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
        <button type="submit" onClick = {submitProducts}>Add Produt</button>
      </form>
    </div>
  );
}
