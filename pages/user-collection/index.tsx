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
                    <div className={styles.userImageContainer} key={image}>
                        <img src={`https://picsum.photos/id/${image}/192/200`} className={styles.userImage} alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.favoriteIcon} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#6eadf4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="#5b7aa4" stroke="#5b7aa4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> */}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UserCollection;