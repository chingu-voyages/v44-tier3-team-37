import React from 'react';
import styles from '../../styles/userCollection.module.css';


interface ImageProps {
    image: { id: number, image: string }
}



const UserSavedImage: React.FC = (props) => {
    const testImages: number[] = [237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251]

    const deleteSavedImage = () => {

    }




    return (
        <div>
            {testImages.map(number => (
                <div key={number}>
                    <img src={`https://picsum.photos/id/${number}/250/200`} />
                </div>
            ))}
        </div>
    )
}

export default UserSavedImage;