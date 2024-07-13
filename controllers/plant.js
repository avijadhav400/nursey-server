import Plant from "../models/Plant.js";

const postPlant = async (req, res) => {
  const { name, category, price, image, description } = req.body;

  if (!name || !category || !price) {
    return res.json({
      success: false,
      message: `Please enter all fields`,
    });
  }

  const newPlant = new Plant({
    name: name,
    category: category,
    price: price,
    image: image,
    descripition: description,
  });

  const savedPlant = await newPlant.save();

  res.json({
    success: true,
    message: `New plant added successfully`,
    data: savedPlant,
  });
};

const getPlants = async (req, res) => {
  const allPlants = await Plant.find().sort({updatedAt: -1});

  if(!allPlants){
    console.log("Problem while getting all plants");
  }

  res.json({
    success: true,
    data: allPlants,
    message: `All plants fetched successfully`,
  });
};

const getPlantId = async (req, res) => {
  const { id } = req.params;

  const plant = await Plant.findById(id);

  res.json({
    success: plant ? true : false,
    data: plant || null,
    message: plant ? "Plant fetched successfully" : "Plant not found",
  });
};

const putPlant = async (req, res) => {
  const { name, category, price, image, description } = req.body;

  const { id } = req.params;

  await Plant.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        category: category,
        price: price,
        image: image,
        description: description,
      },
    }
  );

  const updatedPlant = await Plant.findById(id);

  return res.json({
    success: true,
    message: "Plant updated successfully",
    data: updatedPlant,
  });
};

const deletePlant = async (req, res) => {
  const { id } = req.params;

  await Plant.deleteOne({
    _id: id
  })

  res.json({
    success: true,
    message: `Plant deleted successfully`,
    data: null,
  });
};

export { postPlant, getPlants, getPlantId, putPlant, deletePlant };
