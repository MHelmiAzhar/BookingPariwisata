import Wisata from "../models/Wisata.js";

export const createWisata = async (req, res, next) => {
  const newWisata = new Wisata(req.body);

  try {
    const savedWisata = await newWisata.save();
    res.status(200).json(savedWisata);
  } catch (err) {
    next(err);
  }
};
export const updateWisata = async (req, res, next) => {
  try {
    const updatedWisata = await Wisata.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedWisata);
  } catch (err) {
    next(err);
  }
};
export const deleteWisata = async (req, res, next) => {
  try {
    await Wisata.findByIdAndDelete(req.params.id);
    res.status(200).json("Wisata has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getWisata = async (req, res, next) => {
  try {
    const wisata = await Wisata.findById(req.params.id);
    res.status(200).json(wisata);
  } catch (err) {
    next(err);
  }
};
export const getWisatas = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const wisatas = await Wisata.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 9999999999 },
    }).limit(req.query.limit);
    res.status(200).json(wisatas);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Wisata.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const edukasiCount = await Wisata.countDocuments({ type: "Edukasi" });
    const alamCount = await Wisata.countDocuments({ type: "Alam" });
    const sejarahtCount = await Wisata.countDocuments({ type: "Sejarah" });
    const religiCount = await Wisata.countDocuments({ type: "Religi" });
    const petualanganCount = await Wisata.countDocuments({ type: "Petualangan" });

    res.status(200).json([
      { type: "Edukasi", count: edukasiCount },
      { type: "Alam", count: alamCount },
      { type: "Sejarah", count: sejarahtCount },
      { type: "Religi", count: religiCount },
      { type: "Petualangan", count: petualanganCount },
    ]);
  } catch (err) {
    next(err);
  }
};
