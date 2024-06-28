import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

//This is temporary db
const plants = [
  {
    id: 1,
    name: "Rose",
    category: "flower",
    price: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb7kqj42EQPkCTAjLOf9kOHdyip1CbQ_i0w&s",
    description: "This is the rose image",
  },
  {
    id: 9,
    name: "Mogra",
    category: "flower",
    price: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb7kqj42EQPkCTAjLOf9kOHdyip1CbQ_i0w&s",
    description: "This is the morga image",
  },
  {
    id: 2,
    name: "Coconut",
    category: "Tree",
    price: 200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb7kqj42EQPkCTAjLOf9kOHdyip1CbQ_i0w&s",
    description: "This is the cononut tree",
  },
];

app.post("/plant", (req, res) => {
  const { name, category, price, image, description } = req.body;

  if (!name || !category || !price) {
    return res.json({
      success: false,
      message: `Please enter all fields`,
    });
  }

  const randomId = Math.round(Math.random() * 10000);

  const newPlant = {
    id: randomId,
    name: name,
    category: category,
    price: price,
    image: image,
    description: description,
  };

  plants.push(newPlant);

  res.json({
    success: true,
    message: `New plant added successfully`,
    data: newPlant,
  });
});

app.get("/plants", (req, res) => {
  res.json({
    success: true,
    data: plants,
    message: `All plants fetched successfully`,
  });
});

app.get("/plant/:id", (req, res) => {
  const { id } = req.params;

  const plant = plants.find((p) => p.id == id);

  res.json({
    success: plant ? true : false,
    data: plant || null,
    message: plant ? "Plant fetched successfully" : "Plant not found",
  });
});

app.put("/plant/:id", (req, res) => {
  const { name, category, price, image, description } = req.body;

  const { id } = req.params;

  let index = -1;

  plants.forEach((plant, i) => {
    if (plant.id == id) {
      index = i;
    }
  });

  const newObj = {
    name,
    category,
    price,
    image,
    description,
  };

  if (index == -1) {
    return res.json({
      success: false,
      message: `Plant not found for id ${id}`,
      data: null,
    });
  } else {
    plants[index] = newObj;

    return res.json({
      success: true,
      message: "Plant updated successfully",
      data: newObj,
    });
  }
});

app.delete("/plant/:id", (req, res) => {
  const { id } = req.params;

  let index = -1;

  plants.forEach((plant, i) => {
    if (plant.id == id) {
      index = i;
    }
  });

  if (index == -1) {
    return res.json({
      success: false,
      message: `Plant not found with id ${id}`,
    });
  }

  plants.splice(index, 1);

  res.json({
    success: true,
    message: `Plant deleted successfully`,
    data: null,
  });
});

app.use("*", (req, res) => {
  res.send(`<div style="text-align: center; 
    background-color: #fff; 
    padding: 20px; 
    border-radius: 5px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"> 
        <h1> 404 </h1> 
        <p> 
            Oops! The page you're 
            looking for is not here. 
        </p> 
        <a href="https://nursey-server.onrender.com/"> 
            Go Back to Home 
        </a> 
    </div>  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
