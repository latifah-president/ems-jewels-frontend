import React, {useState} from 'react';
import {useDispatch} from "react-redux"
import {storage} from "./../../firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid green",
    },
    textFieldWide: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left"
      },
}))
const AddProduct = props => {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [totalProgress, setTotalProgress] = useState(0);
    const photoInp = React.createRef();
    const dispatch = useDispatch();

    const uploadImage = event => {
        event.preventDefault();
        let imageName = "jewelry-image-" + Date.now();
        let metaData = {contentType: "image/jpeg"};
        let uploadTask = storage.ref(`images/${imageName}`).put(file, metaData);

        uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            setTotalProgress(progress);
            switch(snapshot.state) {
                case storage.TaskState.PAUSED:
                    console.log(`Upload Paused`);
                    break;
                case storage.TaskState.RUNNING:
                    console.log(`Upload is running`);
                    break;
            }
        }, (error) => {
            alert(error)
        }, () => {
            storage.ref("images").child(imageName).getDownloadURL()
            .then(imageUrl => {
                const productObj = {
                    title: title,
                    description: description,
                    price: price,
                    image_url: imageUrl
                }
                setImageUrl(imageUrl)
                {/*TODO: 
                    -WRITE ADD PRODUCT ACTION AND DECIDE WHETHER OR NOT TO DO HEROKU STYLE FORM IF HEROKU STYLE FORM REMOVE THE PUSH TO HOMEPAGE MAYBE JUST PUSH TO /addproduct OR REFRESH ON SUCCESS
                    -ADD ERROR HANDLING error ? setErrorMsg
                    -ERROR WILL BE SET IN PRODUCT REDUCER AND WILL BE ACCESSED WITH THE USESELECTOR HOOK
                */}
                // dispatch(addProduct(productObj));
                props.history.push("/")
            })
        })
    }
    
    const fileHandler = e => {
        e.persist();
        if (e.target.files[0]) {
          setFile(() => e.target.files[0]);
        }
      };

    return (
        <Grid className={classes.root}>
            <form>
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
                    label="Product Description"
                    margin="dense"
                    variant="outlined"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />  
                 <TextField
                    className={classes.textFieldWide}
                    id="price"
                    type="text"
                    label="Price"
                    margin="dense"
                    variant="outlined"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                /> 
                 <Input
                    id="image-upload"
                    accept="image/*"
                    name="image"
                    type="file"
                    onChange={e => fileHandler(e)}
                    value={image_url}
                    margin="normal"
                    ref={photoInp}
                />
                 <TextField
                    className={classes.textFieldWide}
                    id="category"
                    type="text"
                    label="category"
                    margin="dense"
                    variant="outlined"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />          
            </form>
        </Grid>
    )
};

export default AddProduct;