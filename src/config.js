"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

// General metadata for Ethereum
const description = "Description of project"; // *TODO* Update description
const baseUri = "ipfs://foo.bar"; // *TODO* Update URI

const extraMetadata = {
  creator: "Anastasia Grigovera and Ayton MacEachern",
  seller_fee_basis_points: 500, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://cryptarot.studiothirteen.io",
  creators: [
    {
      address: "0xe93742237eD9B2045798AeAe4D39F6832378acb2", // Anastasia
      share: 50, // 45, **TODO**
    }, 
    {
      address: "0x6ccF4d2Dc91B15BFc3907f0A01f2Abf40a879799", // Ayton
      share: 50, 
    }, // 45, **TODO**
 // {  
      // address: "charity", // For donation to animal shelter
      // share: 10,
 // },
  ],
};

const outputJPEG = false; // if false, the generator outputs png's

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "blank";

// IF you need a provenance hash, turn this on
const hashImages = true;

const layerConfigurations = [
      // {
        // name: "Back Accessory",
        // options: {
        //   bypassDNA: true,
        // },
      // },
  {
    growEditionSizeTo: 200, // 3889, // Minor Arcanas
    namePrefix: "crypTarot_minorArcana",
    layersOrder: [
      { name: "00_cardBack", options: { displayName: "Card Back", bypassDNA: true } },
      { name: "01_bgColour", options: { displayName: "Background Colour", bypassDNA: true } },
      { name: "02_bgPicture", options: { displayName: "Background Picture" } },
      { name: "04_body", options: { displayName: "Shirt" } },
      { name: "05_objects", options: { displayName: "Minor Arcana Card Number" } },
      { name: "06_face", options: { displayName: "Background Extra" } },
      { name: "07_extraTop", options: { displayName: "Minor Arcana Card Suit" } },
      { name: "08_mouth", options: { displayName: "Mouth Accessories" } },
      { name: "09_eyewear", options: { displayName: "Eyewear" } },
      { name: "10_border", options: { displayName: "Headwear/Shoulder Accessories" } },
      { name: "11_numbers", options: { displayName: "Border" } },
      { name: "12_suitsnames", options: { displayName: "Suit" } },
    ],
  },
  // {
  //   growEditionSizeTo: 6111, // Major Arcanas
  //   namePrefix: "crypTarot_majorArcana",
  //   layersOrder: [
  //     { name: "00_bgBorder", options: { displayName: "Card Back", bypassDNA: true } },
  //     { name: "01_bg", options: { displayName: "Background Colour", bypassDNA: true } },
  //     { name: "02_bgPicture", options: { displayName: "Background Picture" } },
  //     { name: "03_majorNameNumberCharacter", options: { displayName: "Major Arcana Card" } },
  //     { name: "04_extraBack", options: { displayName: "Shoulder Accessories" } },
  //     { name: "05_majorFace", options: { displayName: "Animal Face" } },
  //     { name: "06_mouth", options: { displayName: "Mouth Accessories" } },
  //     { name: "07_eyes", options: { displayName: "Eyewear" } },
  //     { name: "08_border", options: { displayName: "Border" } },
  //   ],
  // },
];

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * All layers to have unique names, or you may accidentally set 
 * incompatibilities for the _wrong_ item.
 */
const incompatible = {
  // example
  //  redBackground: ["redHair"],
  // "02_bgPicture": ["foolCard"],
  knightSwords: ["red", "guy", "heart"],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * The items in the array are "required" items that should be pulled from folders
 * further in the stack
 **/
const forcedCombinations = {
  knightBody: ["knightSwords"],
  // Can also do multiple combinations like this example
  // rainbow: ["sun", "toast"],
};

const shuffleLayerConfigurations = false;

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  // Helmet: "Space Helmet",
  // "gold chain": "GOLDEN NECKLACE",
};

const debugLogs = true;

const format = {
  width: 1200,
  height: 1800,
};

const background = {
  generate: false,
  // brightness: "80%",
};

function extraAttributes() {
  return [
    // Optionally, if you need to overwrite one of your layers attributes.
    // You can include the same name as the layer, here, and it will overwrite
    //
    // {
    // trait_type: "Bottom lid",
    //   value: ` Bottom lid # ${Math.random() * 100}`,
    // },
    // {
    //   display_type: "boost_number",
    //   trait_type: "Health",
    //   value: Math.random() * 100,
    // },
    // {
    //   display_type: "boost_number",
    //   trait_type: "Mana",
    //   value: Math.floor(Math.random() * 100),
    // },
  ];
}

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 150,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  buildDir,
  layersDir,
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraAttributes,
  extraMetadata,
  incompatible,
  forcedCombinations,
  traitValueOverrides,
  outputJPEG,
  emptyLayerName,
  useRootTraitType,
  hashImages,
};
