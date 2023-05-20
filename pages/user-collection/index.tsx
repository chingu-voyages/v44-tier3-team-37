import React, { useState } from 'react';
import styles from '../../styles/userCollection.module.css';


interface ImagesProps {
    images: { id: number, image: string }
}

const UserCollection: React.FC<ImagesProps> = (props) => {
    const userImages: number[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    const deleteSavedImage = () => {

    }

    // const [userImages, setUserImages] = useState<{id: number, image: string}[]>();




    return (
        <div className={styles.userCollectionOuterContainer}>
            <div className={styles.userSavedImages}>
                {userImages.map(image => (
                    <div className={styles.userImage}key={image}>
                        <img src={`https://picsum.photos/id/${image}/192/200`} />
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UserCollection;