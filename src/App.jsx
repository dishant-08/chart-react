import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function App() {
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState({
    labels: ["Electronics", "Clothing", "Jewelry"],
    datasets: [
      {
        label: "Total Number of Products by Category",
        data: [0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const electronics = products.filter(
        (item) => item.category === "electronics"
      );
      const clothing = products.filter(
        (item) =>
          item.category === "men's clothing" ||
          item.category === "women's clothing"
      );
      const jewelry = products.filter((item) => item.category === "jewelery");

      setCategoryData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [electronics.length, clothing.length, jewelry.length],
          },
        ],
      }));
    }
  }, [products]);

  return (
    <div className=" w-screen flex justify-center items-center ">
      <div className=" w-2/3 ">
        <Bar data={categoryData} />
      </div>
    </div>
  );
}

export default App;
