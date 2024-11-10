import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./app.css";

function App() {
  const [tabledata, setTabledata] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);

  const currentItems = tabledata?.products.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(tabledata?.total / rowsPerPage);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=0").then((res) => {
      setTabledata(res.data);
    });
  }, []);

  const handlePageChange = (event, value) => {
    setcurrentPage(value);
  };

  return (
    <>
      <h1>Welcome</h1>

      <div className="bg-blue-100 border-blue-600">
        <table className="table bg-slate-50 ml-auto mr-auto border border-black-100 my-3 ">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((values, index) => (
              <tr key={index}>
                <td>{values.title}</td>
                <td>{values.category}</td>
                <td>
                  <LazyLoadImage
                    src={values.images[0]}
                    alt={values.title}
                    width="50"
                    effect="blur" // Adds a blur effect while loading
                    placeholderSrc="https://via.placeholder.com/50" // Placeholder image
                  />
                </td>
                <td>{values.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Stack spacing={2} alignItems={"center"}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </>
  );
}

export default App;
