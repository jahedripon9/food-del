import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {


    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const [image, setImage] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    if (response.data.success) {
        setData({
            name: "",
            description: "",
            price: "",
            category: "Salad"
        });
        setImage(false);
        setPreviewUrl(response.data.image); // ✅ এখানে Cloudinary URL সেট হচ্ছে
        toast.success(response.data.message);
    } else {
        toast.error(response.data.message);
    }

    return (
        
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img src={previewUrl || (image && URL.createObjectURL(image)) || assets.upload_area} alt="preview" />

                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt=""  />
                        :
                        <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt=""  />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=""  />
                        </div>
                }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    )
}

export default FoodItem