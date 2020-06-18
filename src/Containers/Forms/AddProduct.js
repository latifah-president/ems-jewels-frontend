// import React, {useState, useEffect} from 'react';
// import {withRouter} from "react-router-dom";
// import {useDispatch} from "react-redux"
// import {storage} from "./../../firebaseConfig";
// import { makeStyles } from "@material-ui/core/styles";
// import { DropzoneDialog } from 'material-ui-dropzone';
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Input from "@material-ui/core/Input";
// import Button from '@material-ui/core/Button';
// import {purpleColor} from "./../../GlobalStyles/styles";
// import {addProduct} from "./../../Store/Actions/products";
// import { Typography } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         border: "1px solid green",
//     },
//     textFieldWide: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: "416px",
//         justifyContent: "left"
//       },
//       btn: {
//         margin: "2rem auto",
//         color: "white",
//         width: "10%",
//         backgroundColor: `${purpleColor}`,
//         borderRadius: 0,
//         "&:hover": {
//           backgroundColor: `${purpleColor}`,
    
//         }
//     },
// }))
// const AddProduct = props => {
//     const classes = useStyles();
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState(5.00);
//     const [image_url, setImageUrl] = useState("");
//     const [category, setCategory] = useState("");
//     const [file, setFile] = useState(null);
//     const [totalProgress, setTotalProgress] = useState(0);
//     const [previewImg, setPreviewImg] = useState("");
//     const photoInp = React.createRef();
//     const dispatch = useDispatch();

//    const onChange = (e) => {
//         e.persist();
//         switch(e.target.name) {
//             case 'imageUrl':
//                 const file = e.target.files[0];
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                     setPreviewImg(reader.result)
//                 };
//                 reader.readAsDataURL(file);
//                 break;
//             default:
//                 return
//         }
//     }

//     const uploadImage = event => {
//         event.preventDefault();
//         let currentProductName = "jewelry-image-" + Date.now();
//         let metaData = {contentType: "image/jpeg"}
//         let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
    
//         uploadImage.on(
//           "state_changed",
//           (snapshot) => {
//             let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress}% done`);
//             setTotalProgress(progress);
//             // switch(snapshot.state) {
//             //     case storage.TaskState.PAUSED:
//             //         console.log(`Upload Paused`);
//             //         break;
//             //     case storage.TaskState.RUNNING:
//             //         console.log(`Upload is running`);
//             //         break;
//             // }
//           },
//           error => {
//             alert(error.message);
//           },
//           () => {
//             storage
//               .ref("images")
//               .child(currentProductName)
//               .getDownloadURL()
//               .then(url => {
//                 console.log(url);
//                 console.log(image_url)
//                 const productObj = {
//                   title: title,
//                   description: description,
//                   price: price,
//                   image_url: url
//                 };
//                 dispatch(addProduct(productObj));
//                 // props.history.push("/")
//               });
//           }
//         );

       
//     }
    
   
//     const fileHandler = e => {
//         e.persist();
//         if (e.target.files[0]) {
//             console.log("image preview: ", e.target.files[0])
//           setFile(() => e.target.files[0]);
//           setPreviewImg(e.target.files[0].name);
//         }
//       };

//       console.log("image", file);
//       console.log("preview", previewImg)
//     return (
//         <Grid className={classes.root}>
//             <form>
//                 <TextField
//                     className={classes.textFieldWide}
//                     id="title"
//                     type="text"
//                     label="Product Title"
//                     margin="dense"
//                     variant="outlined"
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
//                 />  
//                  <TextField
//                     className={classes.textFieldWide}
//                     id="description"
//                     type="text"
//                     label="Product Description"
//                     margin="dense"
//                     variant="outlined"
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                 />  
//                  <TextField
//                     className={classes.textFieldWide}
//                     id="price"
//                     type="text"
//                     label="Price"
//                     margin="dense"
//                     variant="outlined"
//                     value={price}
//                     placeholder="$"
//                     onChange={e => setPrice(e.target.value)}
//                 /> 
           
//                  <Input
//                     id="image-upload"
//                     accept="image/*"
//                     name="image"
//                     type="file"
//                     onChange={e => fileHandler(e)}
//                     value={image_url}
//                     margin="normal"
//                     ref={photoInp}
//                     label="image upload"
//                 />
//                 <Typography>Progress: {totalProgress}%</Typography>
//                 <img src={previewImg} alt="Image preview"/>
//                  <TextField
//                     className={classes.textFieldWide}
//                     id="category"
//                     type="text"
//                     label="category"
//                     margin="dense"
//                     variant="outlined"
//                     value={category}
//                     onChange={e => setCategory(e.target.value)}
//                 />          
//             </form>
//             <Button className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Submit</Button>
//         </Grid>
//     )
// };

// export default withRouter(AddProduct);


import React, { useState, useRef, createRef } from 'react';
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux"
import {storage} from "./../../firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import {addProduct} from "./../../Store/Actions/products";
import PublishIcon from '@material-ui/icons/Publish';
import {goldColor, purpleColor, categories, } from "./../../GlobalStyles/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        // flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        // border: "2px solid orange",
        margin: "3rem",
        // paddingTop: "2rem",
        [theme.breakpoints.down('xs')]: { 
          flexDirection: "column-reverse",
          width: 300,
          margin: "0rem",
        },
    },
    textFieldWide: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left",
        [theme.breakpoints.down('xs')]: { 
          width: "98%",
          margin: "1rem auto"
        },
      },
      btn: {
        margin: "2rem auto",
        color: "white",
        width: "85%",
        backgroundColor: `${purpleColor}`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: `${goldColor}`,
    
        },
        [theme.breakpoints.down('xs')]: { 
          width: "90%",
        },
    },
    fileInput: {
      border: "1px solid black"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid purple",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
      },
    },
    formGroup: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.down('xs')]: { 
        flexDirection: "column",
        width: "100%",
        border: "2px solid gold",
        marginTop: "1rem"
      },
    },
    imagePreview: {
      width: "70%",
      height: 300,
      // border: "2px solid black",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      margin: "2rem",
      [theme.breakpoints.down('xs')]: { 
       display: "none",
      },
    },
    image: {
      border: `2px dashed ${goldColor}`,
      width: "60%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: `${purpleColor}`,
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
      },
    },
    img: {
      width: "100%",
      height: "100%",
    },
    textarea: {
      width: "98%",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formGrid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "2px solid limegreen ",
      width: "90%",
      marginLeft: "8rem",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
        height: "auto",
        marginLeft: "0rem",
      },
    },
    category: {
      margin: theme.spacing(1),

      // marginLeft: theme.spacing(1),
      //   marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left",
        [theme.breakpoints.down('xs')]: { 
          width: "98%",
          margin: "1rem auto"
        },

    },
    margin: {
      margin: theme.spacing(1),
    },
}));

const AddProduct = props => {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    // eslint-disable-next-line
    const [image_url, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    // const [item_number, setItemNumber] = useState("");
    // const [item_name, setItemName] = useState("");
    // const [supplier, setSupplier] = useState("");
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const photoInp = createRef();
    const inputLabel =useRef(null);
    const dispatch = useDispatch();
    const CHAR_LIMIT = 800;

    const uploadImage = event => {
        event.preventDefault();
        let currentProductName = "product-image-" + Date.now();
        let metaData = {contentType: "image/jpeg"}
        let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          error => {
            alert(error.message);
          },
          () => {
            storage
              .ref("images")
              .child(currentProductName)
              .getDownloadURL()
              .then(url => {
                const productObj = {
                  title: title,
                  description: description,
                  price: price,
                  image_url: url,
                  category: category,
                  quantity: quantity,
                  // item_number: item_number,
                  // item_name: item_name,
                  // supplier: supplier
                };
                dispatch(addProduct(productObj));
                props.history.push("/")
              });
          }
        );
    };
    
   
    const fileHandler = e => {
        e.persist();
        if (e.target.files[0]) {
          setFile(() => e.target.files[0]);
          setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
      };

    return (
        <Grid className={classes.root}>
          <Grid className={classes.imagePreview}>
            <Grid className={classes.image}>
              {file === null ? <PublishIcon/> : <img className={classes.img} src={previewImg} alt={"image preview" || title}/>}
            </Grid>
            <Input
              className={classes.fileInput}
              id="image-upload"
              accept="image/*"
              name="image"
              type="file"
              onChange={e => fileHandler(e)}
              value={image_url}
              margin="dense"
              ref={photoInp}
              label="Image Upload"
            /> 
          </Grid>

          {/*BEGIN FORM */}
          <Grid className={classes.formGrid}>
            <form className={classes.form}>
              <div className={classes.formGroup}>
                  <TextField
                    className={classes.textFieldWide}
                    id="title"
                    type="text"
                    label="Product Title"
                    margin="dense"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />  
                   <TextField
                    className={classes.textFieldWide}
                    id="description"
                    type="text"
                    label="Description"
                    margin="dense"
                    variant="outlined"
                    value={description}
                    rows={2}
                    multiline
                    onChange={e => setDescription(e.target.value)}
                    inputProps={{
                      maxLength: CHAR_LIMIT
                    }}
                    helperText={`${description.length}/${CHAR_LIMIT}`}
                /> 
                 
                  </div>

                  <div className={classes.formGroup}>

<FormControl className={classes.textFieldWide} variant="outlined" style={{margin: "8px"}}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            value={price}
            type="number"
            onChange={e => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            label="Price"
            style={{height: 41}}
          />
        </FormControl>

           <TextField
                    className={classes.textFieldWide}
                    id="quantity"
                    type="text"
                    label="Quantity"
                    margin="dense"
                    variant="outlined"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                </div>

                <div className={classes.formGroup}>
                  <FormControl variant="outlined"  required className={classes.category}>
                        <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Category</InputLabel>
                        <Select
                          // fullWidth
                          id="category"
                          type="text"
                          label="Category"
                          margin="dense"
                          variant="outlined"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                            {categories.map((cat, key) => (
                            <MenuItem key={key} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select> 
                  </FormControl> 

                  {/* <TextField
                    className={classes.textFieldWide}
                    id="supplier"
                    type="text"
                    label="Supplier"
                    margin="dense"
                    variant="outlined"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                />   */}
               
               
                </div>
                
                 {/* <div className={classes.formGroup}>
                 <TextField
                    className={classes.textFieldWide}
                    id="itemNumber"
                    type="text"
                    label="Item Number"
                    margin="dense"
                    variant="outlined"
                    value={item_number}
                    onChange={e => setItemNumber(e.target.value)}
                /> 
                   <TextField
                    className={classes.textFieldWide}
                    id="itemName"
                    type="text"
                    label="Item Name"
                    margin="dense"
                    variant="outlined"
                    value={item_name}
                    onChange={e => setItemName(e.target.value)}
                />
                </div>      */}
            </form>
            <Button aria-label="add new product" className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Add Product</Button>
            </Grid>

         
        </Grid>
    )
};

export default withRouter(AddProduct);